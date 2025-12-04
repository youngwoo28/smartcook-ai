# SmartCook (AI 기반 레시피 추천 서비스)


<p align="center">
  <img src="https://github.com/user-attachments/assets/b30ef1fa-aaef-4679-81b0-9b84e09e16b8" width="800" />
</p>

> **"냉장고 파먹기, 사진 한 장이면 충분합니다."**  
> YOLOv8 사물 인식 기술을 활용해 식재료를 자동 식별하고, 최적의 레시피를 추천하는 웹 서비스

---

## 1. 서비스 시연 (Demo)

**실시간 재료 인식 (Live Detection)**  
<p align="center">
  <img src="https://github.com/user-attachments/assets/a8dd5520-dd17-4936-b848-6fbee90fd776" width="480" />
</p>

> 사용자가 식재료 사진을 업로드하거나 카메라를 비추면,  
> **재료를 인식 → 즉시 요리 가능한 레시피를 추천**합니다.

---

## 2. 시스템 아키텍처 (Architecture)

**기술적 구조도**

<p align="center">
  <img src="https://github.com/user-attachments/assets/0e137f82-5ab0-4953-b754-5e326822d832" width="800" />
</p>

SmartCook은 **Django 백엔드 + YOLOv8 추론 + SQLite 데이터베이스**가 유기적으로 연결된  
**완전한 End-to-End 파이프라인**으로 동작합니다.

### Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/YOLOv8-0E83CD?style=flat-square&logo=opencv&logoColor=white">
  <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E">
  <img src="https://img.shields.io/badge/Git%20LFS-412991?style=flat-square&logo=gitlfs&logoColor=white">
</div>

---

## 3. 핵심 기능 및 화면 (Features)

| **1. 메인 / 이미지 업로드** | **2. 재료 분석 결과** | **3. 레시피 상세 추천** |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/721462f9-b404-4901-8014-c484de0f413e" width="280" /> | <img src="https://github.com/user-attachments/assets/647e5195-1339-450a-8401-75cf2550cc92" width="280" /> | <img src="https://github.com/user-attachments/assets/ecea8831-f60d-46c0-952c-e11451080749" width="280" /> |

---

## 4. 기술적 도전과 해결 (Troubleshooting)

### ① YOLOv8 인식 정확도 개선
- 조명 변화, 유사 색상 재료 오인식 문제  
- → **Threshold 튜닝 + Augmentation 적용**

### ② 데이터 파이프라인 최적화
- 레시피 재료명과 인식 결과 불일치 문제  
- → **정규화(Normalization) + 유사어 매핑 테이블 구축**

### ③ 대용량 모델 관리 (Git LFS)
- GitHub 제한으로 `.pt` 모델 업로드 불가  
- → **Git LFS 도입으로 해결**

---

## 5. 실행 방법 (Run)

<details>
  <summary><strong>Quickstart / 전체 설치 가이드 펼치기</strong></summary>
  
<br/>

SmartCook는 Django 기반 백엔드 서버에서 실행됩니다.  
처음 실행하는 사용자도 그대로 따라 하면 동작하도록 구성되어 있습니다.

---


### 5.1 가상환경 생성 및 활성화

**macOS / Linux**

```bash
# 1) 프로젝트 외부 경로에서 가상환경 생성
python3 -m venv smart

# 2) 가상환경 활성화
source smart/bin/activate

Windows (PowerShell)
# 1) 가상환경 생성
python -m venv smart

# 2) 가상환경 활성화
smart\Scripts\activate
```

### 5.2 프로젝트 백엔드 디렉터리로 이동

**SmartCook의 Django 서버는 smartcook_backend 폴더 안에 있습니다.**

```bash
cd smartcook_backend
```

### 5.3 패키지 설치
```bash
pip install -r requirements.txt
```


**※ ultralytics / opencv-python 등의 패키지는 설치에 다소 시간이 걸릴 수 있습니다.**

### 5.4 데이터베이스 초기 설정(마이그레이션)
```bash
python manage.py migrate
```

### 5.5 YOLO 모델 파일 준비

**SmartCook는 YOLOv8 모델 weight 파일이 필요합니다.
best.pt 파일을 아래 위치에 넣어야 합니다.**

```bash
smartcook_backend/
 └── model/
      └── best.pt
```

**모델 파일이 없으면 이미지 분석 기능이 동작하지 않습니다.**

### 5.6 서버 실행
macOS / Windows / Linux 공통
```bash
python manage.py runserver
```

이후 브라우저에서 아래 주소로 접속합니다.

http://127.0.0.1:8000/

### 5.7 실행 시 참고 사항

**레시피 관련 기능(장바구니, 추천, 검색)을 활성화하기 위해  
`import_recipes.py` 스크립트를 통해 JSON 레시피 데이터를 DB로 사전 로드해야 합니다.**

**/static/fonts/*, /favicon.ico 등의 404 오류는 정상이며 서비스 동작에 영향을 주지 않습니다.**

**실시간 감지 기능(/ws/detect/)은 WebSocket 기반 기능이며 개발 환경에 따라 비활성화될 수 있습니다.
이미지 업로드 기반 재료 인식 및 레시피 추천 기능은 정상적으로 사용 가능합니다.**

</details>


--- 


## 6. 시연 영상 
(Demo Video) 아래 링크에서 확인할 수 있습니다: 

https://youtu.be/jwLQ02vwwZ8 

또는 아래 썸네일을 클릭하여 바로 시청할 수 있습니다:

[![SmartCook Demo](https://img.youtube.com/vi/jwLQ02vwwZ8/0.jpg)](https://youtu.be/jwLQ02vwwZ8)

---

## 7. 성과 및 전시 (Achievements & Exhibitions)

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


