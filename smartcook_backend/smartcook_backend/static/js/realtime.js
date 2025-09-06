
// 실시간 
document.addEventListener("DOMContentLoaded", function () {
    // 기본 요소들
    const loginBtn = document.querySelector(".login-button");
  
    const foodBtn = document.getElementById("food-btn");
    const ingredientBtn = document.getElementById("ingredient-btn");
  
    const foodSection = document.getElementById("food-section");
    const ingredientSection = document.getElementById("ingredient-section");
  
    const foodInput = document.getElementById("food-name");
    const searchIcon = foodSection ? foodSection.querySelector("img") : null;
  
    const recognizedSection = document.getElementById("ingredient-buttons");
    const categorySection = document.getElementById("category-section");
    const recipeSection = document.getElementById("recipe-section");
    const extraSection = document.getElementById("extra-section");
  
    const toCategoryBtn = document.getElementById("toCategoryBtn");
    const toRecipeBtn = document.getElementById("toRecipeBtn");
  
    // Helper: 보이기/숨기기
    function show(section) {
      if (section) section.style.display = "block";
    }
    function hide(section) {
      if (section) section.style.display = "none";
    }
  
    // 초기에는 뒤쪽 섹션 숨김
    hide(recognizedSection);
    hide(categorySection);
    hide(recipeSection);
    hide(extraSection);
  
    // 1. 로그인 버튼 → 로그인 페이지 이동
    if (loginBtn) {
      loginBtn.addEventListener("click", function () {
        window.location.href = "/login/";
      });
    }
  
    // 2. 음식/재료 버튼 전환
    if (foodBtn) {
      foodBtn.addEventListener("click", function () {
        foodBtn.classList.add("active-btn");
        if (ingredientBtn) ingredientBtn.classList.remove("active-btn");
        if (foodSection) foodSection.style.display = "block";
        if (ingredientSection) ingredientSection.style.display = "none";
      });
    }
 
    if (ingredientBtn) {
      ingredientBtn.addEventListener("click", function () {
        ingredientBtn.classList.add("active-btn");
        if (foodBtn) foodBtn.classList.remove("active-btn");
        if (ingredientSection) ingredientSection.style.display = "block";
        if (foodSection) foodSection.style.display = "none";
      });
    }
  
    // 3. 음식명 입력 후 엔터 → 인식된 재료로 이동
    if (foodInput) {
      foodInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault(); // 폼 제출 막기
          const foodName = foodInput.value.trim();
          if (foodName && recognizedSection) {
            show(recognizedSection);
            recognizedSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    }
  
    // 4. 돋보기 클릭 → 인식된 재료로 이동
    if (searchIcon) {
      searchIcon.addEventListener("click", function () {
        const foodName = foodInput ? foodInput.value.trim() : "";
        if (foodName && recognizedSection) {
          show(recognizedSection);
          recognizedSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  
    // 5. 인식된 재료 → 카테고리 이동
    if (toCategoryBtn) {
      toCategoryBtn.addEventListener("click", function () {
        if (categorySection) {
          show(categorySection);
          categorySection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  
    // 6. 카테고리 → 레시피 이동
    if (toRecipeBtn) {
      toRecipeBtn.addEventListener("click", function () {
        if (recipeSection) {
          show(recipeSection);
          recipeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    // 비/선호 재료 (중복 제거)
    // 기존 상단 정의를 사용합니다.

  // 재료 탐색 옵션 관련 요소들
  const uploadOption = document.getElementById("upload-option");
  const realtimeOption = document.getElementById("realtime-option");
  const uploadSection = document.getElementById("upload-section");
  const realtimeSection = document.getElementById("realtime-section");
  const backToOptions = document.getElementById("back-to-options");
  
  // 카메라 관련 요소들
  const startCameraBtn = document.getElementById("start-camera");
  const cameraVideo = document.getElementById("camera-video");
  const cameraCanvas = document.getElementById("camera-canvas");
  const capturedImage = document.getElementById("captured-image");
  const cameraPlaceholder = document.getElementById("camera-placeholder");
  const cameraControls = document.getElementById("camera-controls");
  const captureBtn = document.getElementById("capture-btn");
  const switchBtn = document.getElementById("switch-btn");
  const stopBtn = document.getElementById("stop-btn");
  const recognitionOverlay = document.getElementById("recognition-overlay");
  
  // 뒤로가기 버튼
  const backToOptionsBtn = document.getElementById("back-to-options-btn");

  // 카메라 상태 변수들
  let cameraStream = null;
  let facingMode = 'environment'; // 'environment' (후면) 또는 'user' (전면)
  let isCameraActive = false;

  // 재료 탐색 옵션 선택
  if (uploadOption) {
    uploadOption.addEventListener("click", function () {
      hideIngredientOptions();
      if (uploadSection) show(uploadSection);
      if (backToOptions) show(backToOptions);
    });
  }

  if (realtimeOption) {
    realtimeOption.addEventListener("click", function () {
      hideIngredientOptions();
      if (realtimeSection) show(realtimeSection);
      if (backToOptions) show(backToOptions);
    });
  }

  // 뒤로가기 버튼 클릭
  function showIngredientOptions() {
    hide(uploadSection);
    hide(realtimeSection);
    hide(backToOptions);
    showIngredientOptionsDisplay();
    
    // 카메라 정지
    stopCamera();
  }

  // 옵션 선택 화면 보이기
  function showIngredientOptionsDisplay() {
    const optionsContainer = document.querySelector(".ingredient-options");
    if (optionsContainer) {
      optionsContainer.style.display = "flex";
    }
  }

  // 옵션 선택 화면 숨기기
  function hideIngredientOptions() {
    const optionsContainer = document.querySelector(".ingredient-options");
    if (optionsContainer) {
      optionsContainer.style.display = "none";
    }
  }

  // 뒤로가기 버튼 클릭 이벤트
  if (backToOptionsBtn) {
    backToOptionsBtn.addEventListener("click", function () {
      showIngredientOptions();
    });
  }

  // 카메라 시작
  if (startCameraBtn) {
    startCameraBtn.addEventListener("click", async function () {
      await startCamera();
    });
  }

  // 카메라 시작 함수
  async function startCamera() {
    try {
      // 기존 스트림이 있다면 정지
      if (cameraStream) {
        stopCamera();
      }

      // 카메라 접근 권한 요청
      cameraStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 16/9 }
        },
        audio: false
      });
      
      // 비디오 요소에 스트림 연결
      cameraVideo.srcObject = cameraStream;
      await cameraVideo.play();
      
      // UI 상태 변경
      hide(cameraPlaceholder);
      show(cameraVideo);
      show(cameraControls);
      isCameraActive = true;
      
      console.log('카메라가 성공적으로 시작되었습니다.');
      
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      
      if (error.name === 'NotAllowedError') {
        alert('카메라 접근 권한이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.');
      } else if (error.name === 'NotFoundError') {
        alert('사용 가능한 카메라를 찾을 수 없습니다.');
      } else if (error.name === 'NotReadableError') {
        alert('카메라가 다른 애플리케이션에서 사용 중입니다.');
      } else {
        alert('카메라를 시작할 수 없습니다: ' + error.message);
      }
    }
  }

  // 카메라 정지 함수
  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
        track.stop();
      });
      cameraStream = null;
    }
    
    // UI 상태 초기화
    hide(cameraVideo);
    hide(cameraControls);
    hide(capturedImage);
    hide(recognitionOverlay);
    show(cameraPlaceholder);
    isCameraActive = false;
    
    // 비디오 소스 제거
    cameraVideo.srcObject = null;
  }

  // 카메라 전환 (전면/후면)
  if (switchBtn) {
    switchBtn.addEventListener("click", async function () {
      facingMode = facingMode === 'environment' ? 'user' : 'environment';
      await startCamera();
    });
  }

  // 카메라 중지
  if (stopBtn) {
    stopBtn.addEventListener("click", function () {
      stopCamera();
    });
  }

  // 사진 촬영
  if (captureBtn) {
    captureBtn.addEventListener("click", function () {
      if (!isCameraActive || !cameraVideo || !cameraCanvas) return;
      
      try {
        // 캔버스에 현재 비디오 프레임 그리기
        const canvas = cameraCanvas;
        const video = cameraVideo;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 캔버스를 이미지로 변환
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        if (capturedImage) capturedImage.src = imageDataUrl;
        
        // UI 상태 변경
        if (cameraVideo) hide(cameraVideo);
        if (cameraControls) hide(cameraControls);
        if (capturedImage) show(capturedImage);
        
        // 2초 후 인식 시작
        setTimeout(() => {
          startRecognition();
        }, 2000);
        
      } catch (error) {
        console.error('사진 촬영 오류:', error);
        alert('사진을 촬영할 수 없습니다.');
      }
    });
  
  }

  // 재료 인식 시작
  function startRecognition() {
    if (recognitionOverlay) show(recognitionOverlay);
    
    // 3초 후에 인식 완료 (시뮬레이션)
    setTimeout(() => {
      if (recognitionOverlay) hide(recognitionOverlay);
      if (realtimeSection) hide(realtimeSection);
      if (recognizedSection) {
        show(recognizedSection);
        recognizedSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      
      // 카메라 정지
      stopCamera();
    }, 3000);
  }

    const uploadSectiona = document.querySelector("#ingredient-section .upload-section");
    const realtimeSectiona = document.getElementById("realtime-section");
    const realtimeBtn = document.getElementById("realtime-option");

    if (uploadSectiona && realtimeSectiona && realtimeBtn) {
        realtimeBtn.addEventListener("click", function () {
        // 기존 업로드 섹션 숨기기
        uploadSectiona.style.display = "none";

        // 실시간 섹션 보이기
        realtimeSectiona.style.display = "flex"; // 필요없으면 block
        });
    }


});