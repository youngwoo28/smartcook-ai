# consumers.py

import cv2
import json
import base64
import asyncio
import logging
import sys
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from channels.generic.websocket import AsyncWebsocketConsumer

# OpenVINO 대신 ultralytics 라이브러리를 직접 사용합니다.
from ultralytics import YOLO

# --- 로깅 설정 ---
logger = logging.getLogger()
if not logger.handlers:
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] %(message)s'))
    logger.addHandler(handler)
logger = logging.getLogger(__name__)

# --- 상수 정의 ---
HANGUL_NAMES = {
    0: '사과',        # apple
    1: '소고기',      # beef
    2: '브로콜리',    # broccoli
    3: '양배추',      # cabbage
    4: '당근',        # carrot
    5: '오이',        # cucumber
    6: '계란',        # egg
    7: '상추',        # lettuce
    8: '식빵',        # loaf_of_bread
    9: '버섯',        # mushroom
    10: '양파',       # onion
    11: '오렌지',     # orange
    12: '배',         # pear
    13: '고추',       # pepper
    14: '돼지고기',   # pork
    15: '감자',       # potato
    16: '무',         # radish
    17: '파',         # scallion
    18: '새우',       # shrimp
    19: '시금치',     # spinach
    20: '딸기',       # strawberry
    21: '고구마',     # sweet_potato
    22: '두부'        # tofu
}

# ▼▼▼▼▼ 클래스별 색상 지정 ▼▼▼▼▼
CLASS_COLORS = [
    '#FF3838', '#FF9D97', '#FF701F', '#FFB21D', '#CFD231',
    '#48F28B', '#97FF64', '#01FCEF', '#00A9FF', '#0049FF',
    '#AD46FF', '#FF53B0', '#FFD300', '#00FF87', '#FF8C00',
    '#FF007F', '#4B0082', '#9932CC', '#8B0000', '#7FFF00',
    '#008B8B', '#0000FF', '#FF00FF'
]
# ▲▲▲▲▲ 클래스별 색상 지정 ▲▲▲▲▲

# ▼▼▼▼▼ 여기서 모델의 민감도를 조절할 수 있습니다 ▼▼▼▼▼
CONF_THRESH = 0.65  # 기본(대부분 클래스)에 요구하는 임계값
# 특별 클래스(딸기, 버섯)는 0.5 이상일 때만 표시하도록 별도 정의
SPECIAL_CLASS_THRESH = {
    9: 0.5,   # 버섯
    20: 0.5   # 딸기
}
# 모델에 전달할 predict conf는 모든 필요한 박스를 반환하도록
# 전체 임계값들 중 최소값으로 설정합니다.
PREDICT_CONF = min([CONF_THRESH] + list(SPECIAL_CLASS_THRESH.values()))
# 예: CONF_THRESH=0.65, special=0.5 -> PREDICT_CONF = 0.5
# ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

# 모델 추론을 위한 스레드 풀
executor = ThreadPoolExecutor(max_workers=1)

# --- WebSocket Consumer ---
class DetectConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        try:
            # OpenVINO 모델 대신 원본 best.pt 모델을 로드합니다.
            #self.model = YOLO("best.pt")
            self.model = YOLO("best.engine")
            logger.info("YOLOv8 PyTorch 모델 로드 완료 (best.engine)")
            logger.info(f"Predict conf set to {PREDICT_CONF}, default display conf {CONF_THRESH}, special: {SPECIAL_CLASS_THRESH}")
        except Exception as e:
            logger.error(f"모델 로드 실패: {e}")
            await self.close()
            return

        self.frame_queue = asyncio.Queue(maxsize=1)
        self.loop = asyncio.get_running_loop()
        self.all_detections = set()
        
        # 추론 루프를 백그라운드에서 실행
        asyncio.create_task(self.inference_loop())

    async def disconnect(self, close_code):
        if hasattr(self, 'all_detections') and self.all_detections:
            final_list = list(self.all_detections)
            logger.info(f"[최종 검출 재료] {', '.join(final_list)}")
            try:
                await self.send(text_data=json.dumps({'final_detections': final_list}))
            except: pass
        logger.info("웹소켓 종료됨")

    async def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            frame_data = data.get('frame')
            if not frame_data: return
            frame_bytes = base64.b64decode(frame_data.split(",")[1])
            np_arr = np.frombuffer(frame_bytes, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            if self.frame_queue.full(): await self.frame_queue.get()
            await self.frame_queue.put(img)
        except Exception as e:
            logger.error(f"프레임 수신 오류: {e}")

    async def inference_loop(self):
        while True:
            img = await self.frame_queue.get()
            if img is None: break
            
            # 별도 스레드에서 추론 및 후처리 실행
            await self.loop.run_in_executor(
                executor, self.infer_and_process, img
            )

    def infer_and_process(self, img):
        """
        [동기 함수] 별도 스레드에서 실행됩니다.
        YOLO 모델로 추론하고 결과를 JSON으로 만들어 전송합니다.
        """
        try:
            # predict에선 가장 낮은 필요 신뢰도(PREDICT_CONF)를 전달하여
            # 후처리에서 클래스별로 다시 필터링합니다.
            results = self.model.predict(img, conf=PREDICT_CONF, verbose=False)

            # 결과가 있는 경우에만 처리
            if results and results[0].boxes:
                boxes = results[0].boxes
                frame_detections_data = []
                unique_detections_in_frame = set()

                for box in boxes:
                    cls_idx = int(box.cls.item())
                    conf = float(box.conf.item())
                    # 클래스별 요구 임계값(특수 클래스가 있으면 그 값, 없으면 기본 CONF_THRESH)
                    required_conf = SPECIAL_CLASS_THRESH.get(cls_idx, CONF_THRESH)
                    # 해당 박스가 클래스별 기준을 만족해야 화면에 표시
                    if conf < required_conf:
                        # 기준 미달이면 건너뜀
                        continue

                    cls_name = HANGUL_NAMES.get(cls_idx, f"ID:{cls_idx}")
                    xyxy = box.xyxy.cpu().numpy()[0]
                    
                    # 색상 정보 (index 범위 초과 방지)
                    color = CLASS_COLORS[cls_idx % len(CLASS_COLORS)]

                    frame_detections_data.append({
                        'box': xyxy.tolist(),
                        'label': cls_name,
                        'name': cls_name,
                        'color': color # JSON에 색상 정보 추가
                    })
                    unique_detections_in_frame.add(cls_name)

                if frame_detections_data:
                    self.all_detections.update(unique_detections_in_frame)
                    asyncio.run_coroutine_threadsafe(
                        self.send(text_data=json.dumps({'detections': frame_detections_data})),
                        self.loop
                    )
        except Exception as e:
            logger.error(f"추론/후처리 오류: {e}", exc_info=True)
