# SmartCook  
냉장고 속 재료 이미지를 분석하여 해당 재료로 만들 수 있는 요리를 추천하는 AI 기반 웹 서비스입니다.  
스마트 냉장고 없이도 누구나 사용할 수 있는 **이미지 기반 주방 보조 시스템**을 목표로 개발했습니다.

---

## 핵심 성과 요약 (Key Highlights)

- YOLOv8 기반 이미지 식재료 인식 모델 직접 적용 및 정확도 개선  
- JSON 기반 레시피 데이터 구축 및 추천 알고리즘 설계  
- Django 기반 end-to-end 웹 서비스 구현  
- 2025 한국전자전(KES) 공식 출품 및 **장려상 수상**  
- 졸업 전시회 출품을 통해 서비스 완성도 검증  

---

## 1. 프로젝트 개요

1인 가구 증가와 함께 식재료 관리, 재료 낭비, 요리 난이도 문제가 꾸준히 제기되고 있습니다.  
SmartCook은 이러한 문제를 해결하기 위해 **이미지 기반 재료 인식 → 레시피 추천**을 자동화한 서비스입니다.

서비스 핵심 흐름:

**이미지 업로드 → 재료 인식(YOLO) → JSON 레시피 검색 → 추천 결과 제공**

---

## 2. 개발 목적 / 문제 정의

| 문제 | 설명 |
|------|------|
| 재료 입력의 번거로움 | 기존 앱은 재료를 텍스트로 직접 입력해야 하는 불편함 존재 |
| 식재료 낭비 | 재료를 사용하지 못해 폐기되는 비율 증가 |
| 고가 장비 접근성 문제 | 스마트 냉장고 기능을 일반 사용자도 경험할 수 있는 환경 필요 |

SmartCook은 **이미지 한 장으로 재료를 자동 인식하고, 해당 재료로 만들 수 있는 레시피를 즉시 추천하는 것**을 목표로 합니다.

---

## 3. 주요 기능

- YOLOv8 기반 식재료 자동 인식  
- 인식된 재료 이름으로 JSON 레시피 데이터 검색  
- 레시피의 조리 과정, 재료 구성, 영상/링크 제공  
- 웹 브라우저 기반 서비스 (PC·모바일 지원)  

---

## 4. 기술 스택

**Backend:** Python, Django  
**AI Model:** YOLOv8, OpenCV  
**Frontend:** HTML, CSS, JavaScript (Django Template)  
**Data:** JSON 기반 레시피 데이터  
**Tools:** Git, Git LFS, VS Code  

---

## 5. 시스템 구조

<img src="./images/system_flow.png" width="650" />

### 시스템 구성 설명

1. 사용자가 재료 사진 업로드  
2. Django 서버에서 YOLOv8 모델로 이미지 분석  
3. 감지된 재료 목록 추출  
4. JSON 기반 레시피 데이터에서 관련 레시피 검색  
5. 추천 결과 구성  
6. UI로 렌더링하여 사용자에게 제공  

> end-to-end 파이프라인을 직접 설계 및 구현함.

---

## 6. 화면 구성

| 메인 페이지 | 실시간 재료 인식 | 상세 레시피 |
| ---------- | ---------------- | ----------- |
| <img src="./images/main_page.png" width="350" /> | <img src="./images/ingredients_result.jpg" width="350" /> | <img src="./images/recipe_detail.png" width="350" /> |

- **메인 페이지**: 서비스 소개 및 기능 진입점 제공  
- **실시간 재료 인식**: 업로드된 이미지에서 인식된 재료와 추천 레시피 표시  
- **상세 레시피**: 재료, 조리 순서, 영상 링크 등을 제공  

---

## 7. 개인 기여 및 역할

- YOLOv8 기반 재료 인식 모델 적용 및 정확도 개선  
- Django 서버 구조 설계 및 API 구현  
- **레시피 추천 알고리즘 설계 및 최적화**  
  - 재료 조합 기반 가중치 매칭 로직 구현  
  - 다중 재료 우선순위 계산 알고리즘 개발  
  - 중복·불필요 키워드 제거로 검색 정확도 향상  
- **레시피 데이터 구축 및 정제**  
  - JSON 레시피 데이터셋 직접 수집·구조화  
  - 재료명 표준화(소문자 변환, 중복 제거, 정규화)  
  - 검색 누락 방지 위한 키워드 확장 및 데이터 클린업  
- Git LFS 적용 및 대용량 모델 관리 구조 정립  

---

## 8. 기술적 해결 과정

- **YOLO 인식 정확도 개선**  
  - Confidence/IoU threshold 조정 및 데이터 정제로 오인식 감소  
- **대용량 모델 파일 관리 문제 해결**  
  - Git LFS 적용으로 안정적인 버전 관리  
- **Media/Static 경로 충돌 해결**  
  - 업로드 경로 분리 및 URL 매핑 구조 재정립  
- **레시피 매칭 정확도 개선**  
  - 재료명 정규화, 키워드 확장, 소문자 통일 등 데이터 정제 로직 추가  
- **응답 속도 최적화**  
  - YOLO 추론·레시피 검색 파이프라인 최적화  

---
<details>
<summary>## 9. 실행 방법 (Run Instructions)</summary>

SmartCook는 Django 기반 백엔드 서버에서 실행됩니다.  
처음 실행하는 사용자도 그대로 따라 하면 동작하도록 구성되어 있습니다.

---

## 9.1 가상환경 생성 및 활성화

### ▶ macOS / Linux

```bash
# 1) 프로젝트 외부 경로에서 가상환경 생성
python3 -m venv smart

# 2) 가상환경 활성화
source smart/bin/activate

▶ Windows (PowerShell)
# 1) 가상환경 생성
python -m venv smart

# 2) 가상환경 활성화
smart\Scripts\activate
```

9.2 프로젝트 백엔드 디렉터리로 이동

SmartCook의 Django 서버는 smartcook_backend 폴더 안에 있습니다.

```bash
cd smartcook_backend
```

9.3 패키지 설치
```bash
pip install -r requirements.txt
```


※ ultralytics / opencv-python 등의 패키지는 설치에 다소 시간이 걸릴 수 있습니다.

9.4 데이터베이스 초기 설정(마이그레이션)
```bash
python manage.py migrate
```

9.5 YOLO 모델 파일 준비

SmartCook는 YOLOv8 모델 weight 파일이 필요합니다.
best.pt 파일을 아래 위치에 넣어야 합니다.

smartcook_backend/
 └── model/
      └── best.pt


모델 파일이 없으면 이미지 분석 기능이 동작하지 않습니다.

9.6 서버 실행
▶ macOS / Windows / Linux 공통
```bash
python manage.py runserver
```

이후 브라우저에서 아래 주소로 접속합니다.

http://127.0.0.1:8000/

9.7 실행 시 참고 사항

레시피 관련 기능(장바구니, 추천, 검색)을 활성화하기 위해  
`import_recipes.py` 스크립트를 통해 JSON 레시피 데이터를 DB로 사전 로드해야 합니다.

/static/fonts/*, /favicon.ico 등의 404 오류는 정상이며 서비스 동작에 영향을 주지 않습니다.

실시간 감지 기능(/ws/detect/)은 WebSocket 기반 기능이며 개발 환경에 따라 비활성화될 수 있습니다.
이미지 업로드 기반 재료 인식 및 레시피 추천 기능은 정상적으로 사용 가능합니다.


## 10. 시연 영상 
(Demo Video) 아래 링크에서 확인할 수 있습니다: 

https://youtu.be/jwLQ02vwwZ8 

또는 아래 썸네일을 클릭하여 바로 시청할 수 있습니다:

[![SmartCook Demo](https://img.youtube.com/vi/jwLQ02vwwZ8/0.jpg)](https://youtu.be/jwLQ02vwwZ8)


---

## 11. 성과 및 전시 (Achievements & Exhibitions)

- **2025 한국전자전(KES) – 동양미래대학교관 공식 출품 (장려상 수상)**  
  - SmartCook 서비스 데모 시연  
  - 이미지 인식 기반 요리 추천 서비스로 기술·서비스 완성도 평가  

- **동양미래대학교 졸업 전시회 참가**  
  - SmartCook 프로젝트 전시 (6개팀 중 2등 수상)
  - UI/UX 및 모델 파이프라인에 대한 현장 피드백 확보  

---

  ## **팀원 소개**

| **이름** | **역할** | **담당 업무** | **GitHub** |
|-----------|-----------|----------------|----------------|
| **최영우** | **PM / 기획** | 프로젝트 총괄, 추천알고리즘 설계, 데이터 크롤링 | [GitHub](https://github.com/youngwoo28) |
| **이건호** | **ML 개발** | 전처리, 반응형 디자인 | [GitHub](https://github.com/geonho27) |
| **경규민** | **AI 개발** | YOLO 모델 학습, 학습 데이터셋 설계 | [GitHub](https://github.com/gyumin8) |
| **홍연화** | **프론트엔드&백엔드 개발** | 인터페이스 디자인, Django API, UI/UX 구현 | [GitHub](https://github.com/ghddusghk46) |
| **이유민** | **프론트엔드&백엔드 및 AI 연동** | TTS/STT 기능, 웹 구조 구현, 서버 구축 | [GitHub](https://github.com/YUM-MING) |


