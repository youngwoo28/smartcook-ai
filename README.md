![SmartCook Banner](./images/smartcook_banner.png)

<br/><br/>

# SmartCook <img src="https://img.shields.io/badge/AI%20Kitchen-SmartCook-ff7f50?style=flat-square" align="left">

> 냉장고 사진 한 장으로, **재료 인식부터 레시피 추천까지** 이어지는 AI 기반 주방 보조 서비스

<br/><br/>

<!-- Social Badges -->
<p align="left">
  <a href="mailto:a01092011940@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white" />
  </a>
  <a href="https://github.com/youngwoo28/smartcook-ai">
    <img src="https://img.shields.io/badge/GitHub-smartcook--ai-181717?style=flat-square&logo=GitHub&logoColor=white" />
  </a>
  <a href="https://record50460.tistory.com">
    <img src="https://img.shields.io/badge/Blog-Tistory-ff6f0f?style=flat-square&logo=tistory&logoColor=white" />
  </a>
  <a href="https://youtu.be/jwLQ02vwwZ8">
    <img src="https://img.shields.io/badge/Demo-YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white" />
  </a>
</p>

<br/>

> **SmartCook은 YOLOv8 기반 이미지 인식과 Django 웹 서버를 결합한,  
> “스마트 냉장고 없이도 누구나 쓸 수 있는 이미지 기반 레시피 추천 서비스”입니다.**

<br/>

---

## 1. 서비스 소개

<img width="90%" align="center" alt="SmartCook Overview" src="./images/main_page.png">

SmartCook은 냉장고 속 재료 사진을 업로드하면,  
이미지 속 재료를 자동 인식하고 그 재료로 만들 수 있는 레시피를 추천하는 AI 웹 서비스입니다.

**서비스 핵심 플로우**

> 이미지 업로드 → 재료 인식(YOLOv8) → JSON 레시피 검색 → 추천 결과 제공

<br/>

### 핵심 성과 요약 (Key Highlights)

- YOLOv8 기반 이미지 식재료 인식 모델 직접 적용 및 정확도 개선  
- JSON 기반 레시피 데이터 구축 및 추천 알고리즘 설계  
- Django 기반 end-to-end 웹 서비스 구현  
- 2025 한국전자전(KES) 공식 출품 및 **장려상 수상**  
- 동양미래대학교 졸업 전시회 출품 (6개 팀 중 2등)  

<br/>

---

## 2. 문제 정의 & 목표

| 문제 | 설명 |
|------|------|
| 재료 입력의 번거로움 | 기존 앱/서비스는 재료를 텍스트로 하나씩 입력해야 하는 불편함 존재 |
| 식재료 낭비 | 남은 재료를 사용하지 못해 폐기되는 비율 증가 |
| 고가 장비 접근성 | 스마트 냉장고 등 고가 하드웨어에 의존하는 솔루션은 일반 사용자에게 부담 |

**SmartCook의 목표**

> **이미지 한 장으로 재료를 자동 인식하고,  
> 그 재료로 만들 수 있는 레시피를 바로 추천하는 것.**

<br/>

---

## 3. 주요 기능

- YOLOv8 기반 식재료 자동 인식  
- 인식된 재료 이름으로 JSON 레시피 데이터 검색  
- 레시피의 **조리 과정 / 재료 구성 / 영상 링크** 제공  
- PC·모바일에서 모두 사용 가능한 웹 브라우저 기반 서비스  

### Live Detection Demo

<p align="center">
  <img src="./images/live_detect.gif" width="480" alt="실시간 재료 인식 GIF" />
</p>

> 실시간 영상/카메라 기반 인식까지 확장 가능한 구조로 설계했습니다.

<br/>

---

## 4. 사용 스택

<div align="left">
<div>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white">
<img src="https://img.shields.io/badge/YOLOv8-0E83CD?style=flat-square&logo=opencv&logoColor=white">
<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E">
</div>
<div>
<img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white">
<img src="https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Git%20LFS-412991?style=flat-square&logo=gitlfs&logoColor=white">
</div>
</div>

<br/>

---

## 5. 시스템 구조

<p align="center">
  <img src="./images/system_flow.png" width="750" alt="SmartCook System Architecture" />
</p>

### 구성 플로우

1. 사용자가 재료 사진 업로드  
2. Django 서버에서 YOLOv8 모델로 이미지 분석  
3. 감지된 재료 목록 추출  
4. JSON 기반 레시피 데이터에서 관련 레시피 검색  
5. 추천 결과 구성  
6. 템플릿 렌더링을 통해 결과 화면 제공  

> end-to-end 파이프라인(업로드 → 인식 → 매칭 → 추천)을 직접 설계하고 구현했습니다.

<br/>

---

## 6. 화면 구성 (UI)

| 메인 페이지 | 실시간 재료 인식 | 상세 레시피 |
| ---------- | ---------------- | ----------- |
| <img src="./images/main_page.png" width="320" /> | <img src="./images/ingredients_result.jpg" width="320" /> | <img src="./images/recipe_detail.png" width="320" /> |

- **메인 페이지**: 서비스 소개 및 기능 진입점  
- **실시간/업로드 인식 화면**: 인식된 재료 + 추천 레시피 목록 제공  
- **상세 레시피 화면**: 재료, 조리 순서, 참고 영상/링크 제공  

<br/>

---

## 7. 개인 기여 및 역할

- **모델/인식**
  - YOLOv8 기반 재료 인식 모델 적용 및 정확도 개선  
  - Confidence / IoU threshold 튜닝 및 데이터 정제로 오인식 감소  
- **서버/추천 로직**
  - Django 서버 구조 설계 및 주요 API 구현  
  - 재료 조합 기반 레시피 추천 알고리즘 설계 및 최적화  
  - 다중 재료 우선순위 계산, 가중치 기반 매칭 로직 구현  
- **데이터 구축/정제**
  - JSON 레시피 데이터셋 직접 수집·구조화  
  - 재료명 표준화(소문자 통일, 중복 제거, 정규화)  
  - 키워드 확장 및 클린업으로 검색 누락 최소화  
- **협업/버전 관리**
  - Git LFS 도입 및 YOLO 모델 파일(Large weight) 관리 구조 정립  

<br/>

---

## 8. 기술적 해결 과정

- **YOLO 인식 정확도 개선**
  - threshold 튜닝 & 샘플 데이터 정제로 조명/배경 변화에 대한 인식 품질 향상  
- **대용량 모델 파일 관리**
  - Git LFS 적용으로 `best.pt` 등 대용량 weight 파일 안정적 관리  
- **Media / Static 경로 충돌 해결**
  - 업로드 파일과 정적 리소스 경로를 분리하고 URL 매핑 구조 재정의  
- **레시피 매칭 정확도 개선**
  - 재료명 정규화 및 키워드 확장으로 다양한 입력에도 일관된 매칭 유지  
- **응답 속도 최적화**
  - YOLO 추론 파이프라인, 레시피 검색 쿼리 구조 최적화  

<br/>

---

## 9. 실행 방법 (Run)

<details>
  <summary><strong>Quickstart / 전체 설치 가이드 펼치기</strong></summary>
  
<br/>

SmartCook는 Django 기반 백엔드 서버에서 실행됩니다.  
처음 실행하는 사용자도 그대로 따라 하면 동작하도록 구성되어 있습니다.

---


### 9.1 가상환경 생성 및 활성화

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
macOS / Windows / Linux 공통
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

</details>


--- 


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


