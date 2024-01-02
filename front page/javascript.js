let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.getElementsByClassName('carousel-image');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[currentSlide].style.display = 'block';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
        nextSlide();
    }, 5000); // Adjust the interval as needed (currently set to 5 seconds)
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Automatic slide show
startAutoSlide();

// Pause on hover
document.getElementById('image-carousel').addEventListener('mouseover', function () {
    stopAutoSlide();
});

// Resume on mouse leave
document.getElementById('image-carousel').addEventListener('mouseleave', function () {
    startAutoSlide();
});

// Show initial slide
showSlide(currentSlide);

// Additional script for the homepage image carousel
let currentIndex = 0;
let carouselImages = document.getElementsByClassName("carousel-image");

function showNextImage() {
    carouselImages[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % carouselImages.length;
    carouselImages[currentIndex].style.display = "block";
}

// Display the first image initially
carouselImages[currentIndex].style.display = "block";

// Set an interval to switch images every 5 seconds (adjust as needed)
setInterval(showNextImage, 3000);


