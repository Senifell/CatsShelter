document.addEventListener("DOMContentLoaded", function () {
  const ball = document.getElementById("ball");

  ball.addEventListener("click", function () {
    ball.classList.remove("active");
    void ball.offsetWidth; // Принудительный рефлоу
    ball.classList.add("active");
  });

  ball.addEventListener("animationend", function () {
    setTimeout(() => {
      ball.classList.remove("active"); // Небольшое увеличение котенка
    }, 2000); // Задержка в 1 секунду для синхронизации анимации
    //ball.classList.remove("active");
  });

  // setTimeout(() => {
  //     ball.remove("active"); // Небольшое увеличение котенка
  //   }, 4000); // Задержка в 1 секунду для синхронизации анимации
});
