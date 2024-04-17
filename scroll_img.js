document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  showSlides(slideIndex);

  document.getElementById("prevButton").onclick = function () {
    showSlides((slideIndex -= 1));
  };
  document.getElementById("nextButton").onclick = function () {
    showSlides((slideIndex += 1));
  };

  function showSlides(n) {
    let slides = document.getElementsByClassName("slide");

    console.log(slides);

    if (n >= slides.length) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
  }
});