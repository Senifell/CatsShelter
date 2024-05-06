document.addEventListener("DOMContentLoaded", function () {
  const ball = document.getElementById("ball");

  ball.addEventListener("click", function () {
    ball.classList.remove("active");
    void ball.offsetWidth; 
    ball.classList.add("active");
  });

  ball.addEventListener("animationend", function () {
    setTimeout(() => {
      ball.classList.remove("active");
    }, 2000);
  });

});
