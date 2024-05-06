const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Загрузка переменных окружения из файла .env
dotenv.config();

// Указываем Express использовать шаблонизатор ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Указываем Express отдавать статические файлы из папки public
app.use(express.static(path.join(__dirname, "public")));

// Определяем маршрут для главной страницы
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// Определяем маршрут для страницы контактов и передаем в нее переменную окружения
app.get('/contacts', (req, res) => {
    res.render('contacts', { API_YANDEX_KEY: process.env.API_YANDEX_KEY });
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
