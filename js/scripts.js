let currentSlide = 0;

function showSlides() {
    
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");

    //Hide Slides
    for (let i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }

    currentSlide++;

    if (currentSlide > slides.length) {
        currentSlide = 1;
    }

    //Hide Dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[currentSlide-1].style.display = "block";
    dots[currentSlide-1].className += " active";

    setTimeout(showSlides, 3000);
}

showSlides();