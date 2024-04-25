document.addEventListener("DOMContentLoaded", function () {
// Инициализация карты
var map = L.map('map').setView([55.71553,37.58455], 13);

// Добавление слоя OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Добавление маркера
L.marker([55.71553,37.58455]).addTo(map)
    .bindPopup('Привет, это Leaflet!');
});