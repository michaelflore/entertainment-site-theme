document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('#slider .slide');
    let currentSlide = 0;
    let previousBtn = document.querySelector('.button-left');
    let nextBtn = document.querySelector('.button-right');
    
    function previousSlide() {
      slides[currentSlide].className = "slide";
      
      currentSlide--;
      
      if(currentSlide < 0 ) {
        currentSlide = slides.length - 1;
      }
      
      slides[currentSlide].className = "slide showing";
    }
    
    function nextSlide() {
     
      slides[currentSlide].className = "slide";
      currentSlide++;
     
      if(currentSlide > slides.length - 1) {
        currentSlide = 0;
      }
   
      slides[currentSlide].className = "slide showing";
    }
    
    previousBtn.addEventListener('click', function() {
      previousSlide();
    });
    
    nextBtn.addEventListener('click', function() {
      nextSlide();
    });

  });
