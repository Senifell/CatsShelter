document.addEventListener("DOMContentLoaded", function () {
  const clickableParagraphs = document.querySelectorAll(".clickable");

  clickableParagraphs.forEach((paragraph) => {
    paragraph.addEventListener("click", function () {
      // Получаем текст из span внутри абзаца
      const textToCopy = paragraph.querySelector("span").textContent;

      // Копируем текст в буфер обмена
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // Уведомляем пользователя о копировании
          const notification = document.createElement("div");
          notification.classList.add("notification");
          notification.textContent = `Текст "${textToCopy}" скопирован в буфер обмена.`;

          // Добавляем уведомление на страницу
          document.body.appendChild(notification);

          // Устанавливаем таймер для удаления уведомления через 3 секунды
          setTimeout(() => {
            notification.remove();
          }, 3000);
        })
        .catch((err) => {
          console.error("Не удалось скопировать текст: ", err);
        });
    });
  });
});
