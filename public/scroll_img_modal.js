// DOMContentLoaded опущен, т.к. скрипт добавляется динамически после открытия модального окна в конец body

window.slideIndex = 0;
showSlides(window.slideIndex);

if (document.getElementById("photos-container").childElementCount > 1) {
  document.getElementById("prevButton").onclick = function () {
    showSlides((window.slideIndex -= 1));
  };
  document.getElementById("nextButton").onclick = function () {
    showSlides((window.slideIndex += 1));
  };
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");

  if (n >= slides.length) {
    window.slideIndex = 0;
  }
  if (n < 0) {
    window.slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[window.slideIndex].style.display = "block";
}
