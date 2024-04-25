import config from './config.js';
  // Получение API ключа из переменной окружения
  const apiKey = config.API_YANDEX_KEY;

  // Создание элемента скрипта для подключения API Яндекс Карт
  const script = document.createElement("script");
  script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;

  // Добавление скрипта в конец тега body
  document.body.appendChild(script);