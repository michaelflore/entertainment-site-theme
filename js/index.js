const carouselFrames = document.querySelectorAll(".carousel-frame");

function fadeCarousel(carouselFrame) {
  const carouselTrack = carouselFrame.querySelector(".carousel-track");
  const slides = carouselTrack.querySelectorAll('.carousel-slide');

  const prevBtn = carouselFrame.querySelector('.button-left');
  const nextBtn = carouselFrame.querySelector('.button-right');

  const navDots = Array.from(carouselFrame.querySelectorAll(".carousel-dots button"));

  let currentSlide = 0;

  function goToSlide(e) {
    removeButtonListeners();
    removeDotListeners();

    slides[currentSlide].classList.remove("show");
  
    currentSlide = navDots.indexOf(e.target);
  
    slides[currentSlide].classList.add("show");
  }
  
  function slideBack() {
    removeButtonListeners();
    removeDotListeners();

    //prevent fast change bugs just in case
    if(currentSlide < 0) {
      return;
    }


    slides[currentSlide].classList.remove("show");
  
    currentSlide--;
    
    if(currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add("show");
  }
  
  function slideForward() {
    removeButtonListeners();
    removeDotListeners();

    //prevent fast change bugs just in case
    if(currentSlide > slides.length - 1) {
      return;
    }

    slides[currentSlide].classList.remove("show");
  
    currentSlide++;
    
    if(currentSlide > slides.length - 1) {
      currentSlide = 0;
    }
  
    slides[currentSlide].classList.add("show");
  }
  
  function currentActiveDot() {
    navDots.forEach((button) => {
      if(navDots.indexOf(button) == currentSlide) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  function navigate(e) {
    switch(e.key) {
        case "ArrowLeft":
            slideBack();                

            break;
        case "ArrowRight":
            slideForward();                

            break;
        default: 
            break;
    }
  }
  
  function addDotListeners() {
    navDots.forEach((button) => {
      button.addEventListener("keydown", navigate);
      button.addEventListener("click", goToSlide);
    });
  }

  function removeDotListeners() {
    navDots.forEach((button) => {
      button.removeEventListener("keydown", navigate);
      button.removeEventListener("click", goToSlide);
    });
  }

  function addButtonListeners() {
    prevBtn.addEventListener("keydown", navigate);
    nextBtn.addEventListener("keydown", navigate);
    prevBtn.addEventListener("click", slideBack);
    nextBtn.addEventListener("click", slideForward);
  }

  function removeButtonListeners() {
    prevBtn.removeEventListener("keydown", navigate);
    nextBtn.removeEventListener("keydown", navigate);
    prevBtn.removeEventListener("click", slideBack);
    nextBtn.removeEventListener("click", slideForward);
  }
  
  function addTransitionListener() {
    carouselTrack.addEventListener("transitionend", function()  {
      //Reattach
      addButtonListeners();
      addDotListeners();

      currentActiveDot();
    });
  }
  
  function autoPlay() {
    let playInterval = setInterval(slideForward, 4000);
  
    carouselFrame.addEventListener("mouseenter", function() {
        clearInterval(playInterval);
        playInterval = null;
    });
  
    carouselFrame.addEventListener("mouseleave", function() {
        playInterval = setInterval(slideForward, 4000); 
    });
  
    document.addEventListener("visibilitychange", function() {
        if(document.visibilityState === "visible" && !playInterval) {
            playInterval = setInterval(slideForward, 4000); 
        } else {
            clearInterval(playInterval);
            playInterval = null;
        }
    });
  }
  
  addDotListeners();
  addButtonListeners();
  addTransitionListener();
  autoPlay();
}

for(const frame of carouselFrames) {
  fadeCarousel(frame);
}