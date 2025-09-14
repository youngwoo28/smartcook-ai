from ultralytics import YOLO
import cv2

# 1️⃣ 모델 로드
model = YOLO("smartcook_backend/best.pt")  # 경로 본인 환경에 맞게

# 2️⃣ 웹캠 열기
cap = cv2.VideoCapture(0)  # 0이면 기본 카메라

if not cap.isOpened():
    print("웹캠을 열 수 없습니다.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 3️⃣ 추론
    results = model(frame)

    # 4️⃣ 바운딩 박스 그리기
    annotated_frame = results[0].plot()  # plot()이 박스, 클래스, 신뢰도 표시

    # 5️⃣ 화면 표시
    cv2.imshow("YOLO Live", annotated_frame)

    # q 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
