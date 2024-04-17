document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("cats-container");

  // Фильтрация котиков по полу
  function filterCats(cats, gender, minMonth, maxMonth, minYear, maxYear) {
    let filteredCats = cats;

    if (gender.length !== 0) {
      filteredCats = filteredCats.filter((cat) => {
        return gender.includes(cat.gender);
      });
    }

    filteredCats = filteredCats.filter((cat) => {
      return (
        cat.age.years <= maxYear &&
        cat.age.years >= minYear &&
        cat.age.months <= maxMonth &&
        cat.age.months >= minMonth
      );
    });

    return filteredCats;
  }

  // Функция для отрисовки котиков
  function renderCats(cats) {
    container.innerHTML = ""; // Очищаем контейнер перед добавлением котиков

    cats.forEach((cat) => {
      const catElement = document.createElement("div");
      catElement.classList.add("cat-card");
      catElement.innerHTML = `
          <h4 data-id="${cat.id}">${cat.name}</h4>
          <p>
          ${cat.gender === "male" ? "Кот" : "Кошка"}
          <br>
            Возраст: ${cat.age.years == "0" ? "" : cat.age.years + " г."} ${
        cat.age.months == "0" ? "" : cat.age.months + " мес."
      } 
          </p>
          <button class="show-modal-btn">Доп. информация</button>

          <img src=".${cat.main_photo}" alt="Фото кота ${cat.name}" />
        `;
      container.appendChild(catElement);
    });

    function renderModalCatWindow(catId) {
      const modalContent = document.getElementById("modal-cat-window");
      modalContent.innerHTML = "";

      const modalCat = cats.find((cat) => cat.id == catId);

      if (modalCat) {
        const modalElement = document.createElement("div");
        modalElement.classList.add("modal-cat");
        modalElement.innerHTML = `
          <h4 data-id="${modalCat.id}">${modalCat.name}</h4>
          <p>
          ${modalCat.gender === "male" ? "Кот" : "Кошка"}
          </p>
          <p>
            Возраст: ${
              modalCat.age.years == "0" ? "" : modalCat.age.years + " г."
            } ${
          modalCat.age.months == "0" ? "" : modalCat.age.months + " мес."
        } 
          </p>
          <p>
          ${
            modalCat.birthdate === null
              ? ""
              : "Дата рождения:  " + modalCat.birthdate
          }
          </p>
          <p>
          ${modalCat.color === null ? "" : "Цвет шерсти: " + modalCat.color}
          </p>
          <p>
          ${
            modalCat.coat_type === null
              ? ""
              : "Тип шерсти: " + modalCat.coat_type
          }
          </p>
          <p>
          ${
            modalCat.additional_info == null
              ? ""
              : "Дополнительная информация: " + modalCat.additional_info
          }
          </p>`;

        function renderModalCatPhotos(modalCat) {
          const photosContainer = document.getElementById("photos-container");
          photosContainer.innerHTML = ""; // Очищаем контейнер перед добавлением фотографий

          if (modalCat.main_photo && modalCat.main_photo.length > 0) {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide");

            const img = document.createElement("img");
            img.src = "." + modalCat.main_photo;
            img.alt = `Фото кота ${modalCat.name}`;

            slideDiv.appendChild(img);
            photosContainer.appendChild(slideDiv);
          }

          if (modalCat.photos && modalCat.photos.length > 0) {
            modalCat.photos.forEach((photo, index) => {
              const slideDiv = document.createElement("div");
              slideDiv.classList.add("slide");

              const img = document.createElement("img");
              img.src = "." + photo;
              img.alt = `Фото кота ${modalCat.name}`;

              slideDiv.appendChild(img);
              photosContainer.appendChild(slideDiv);
            });
          }

          //console.log(photosContainer.childElementCount);
          if (photosContainer.childElementCount > 1) {
            const aPrev = document.createElement("a");
            aPrev.classList.add("prev");
            aPrev.setAttribute("id", "prevButton");
            aPrev.innerHTML = "&#10094;";
            const aNext = document.createElement("a");
            aNext.classList.add("next");
            aNext.setAttribute("id", "nextButton");
            aNext.innerHTML = "&#10095;";
  
            photosContainer.appendChild(aPrev);
            photosContainer.appendChild(aNext);
          }


          // console.log(photosContainer.innerHTML);
        }

        renderModalCatPhotos(modalCat);

        modalContent.appendChild(modalElement);
      } else {
        modalContent.textContent = `Дополнительная информация не найдена`;
      }
    }

    const showModalBtns = document.querySelectorAll(".show-modal-btn");
    showModalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = document.getElementById("modal");
        const catId = btn.parentElement
          .querySelector("h4")
          .getAttribute("data-id");
        renderModalCatWindow(catId);
        modal.showModal();

        const scriptScrollImg = document.getElementById("scrollImg");
        if (!scriptScrollImg) {
          setTimeout(function () {
            const jsScript = document.createElement("script");
            jsScript.src = "scroll_img_modal.js";
            jsScript.id = "scrollImg";
            document.body.appendChild(jsScript);
          }, 100); // Задержка в миллисекундах перед добавлением скрипта
        }
      });
    });

    // Добавление обработчика события для кнопки "Закрыть"
    // const closeModalBtn = document.getElementById("close-modal-btn");
    // closeModalBtn.addEventListener("click", function () {
    //   const modal = document.getElementById("modal");
    //   modal.close();
    // });

    const closeXModalBtn = document.querySelector(".close-modal-btn");
    closeXModalBtn.addEventListener("click", function () {
      const modal = document.getElementById("modal");
      modal.close();
      const scriptScrollImg = document.getElementById("scrollImg");
      if (scriptScrollImg) {
        scriptScrollImg.remove();
      }
    });
  }

  // Загрузка данных из JSON файла
  fetch("cats.json")
    .then((response) => response.json())
    .then((data) => {
      renderCats(data); // Отображаем всех котиков при загрузке страницы

      $(function () {
        $("#slider").slider({
          range: true,
          min: 1,
          max: 20,
          values: [1, 20],
          slide: function (event, ui) {
            $("#min-years").val(ui.values[0]);
            $("#max-years").val(ui.values[1]);
            updateFilterValues();
          },
        });

        // Обработчик изменения значения для поля ввода минимального возраста
        $("#min-years").change(function () {
          var minValue = parseInt($(this).val());
          var maxValue = parseInt($("#max-years").val());
          $("#slider").slider("values", [minValue, maxValue]);
        });

        // Обработчик изменения значения для поля ввода максимального возраста
        $("#max-years").change(function () {
          var minValue = parseInt($("#min-years").val());
          var maxValue = parseInt($(this).val());
          $("#slider").slider("values", [minValue, maxValue]);
        });
      });

      $(function () {
        $("#slider-month").slider({
          range: true,
          min: 2,
          max: 11,
          values: [2, 11],
          slide: function (event, ui) {
            $("#min-month").val(ui.values[0]);
            $("#max-month").val(ui.values[1]);
            updateFilterValues();
          },
        });

        // Обработчик изменения значения для поля ввода минимального возраста
        $("#min-month").change(function () {
          var minValue = parseInt($(this).val());
          var maxValue = parseInt($("#max-month").val());
          $("#slider-month").slider("values", [minValue, maxValue]);
        });

        // Обработчик изменения значения для поля ввода максимального возраста
        $("#max-month").change(function () {
          var minValue = parseInt($("#min-month").val());
          var maxValue = parseInt($(this).val());
          $("#slider-month").slider("values", [minValue, maxValue]);
        });
      });

      // Вызываем функцию фильтрации при изменении любого из фильтров
      $(
        "#male-checkbox, #female-checkbox, #kitten, #adult, #month-filter, #year-filter"
      ).change(function () {
        updateFilterValues();
      });

      function updateFilterValues() {
        const maleCheckbox = document.getElementById("male-checkbox");
        const femaleCheckbox = document.getElementById("female-checkbox");
        const filterValuesSex = [];
        filterValuesSex.length = 0;
        let minYear = 0;
        let maxYear = 20;
        let minMonth = 0;
        let maxMonth = 11;

        const kittenFilter = document.getElementById("kitten");
        const adultFilter = document.getElementById("adult");
        const monthFilter = document.getElementById("month-filter");
        const yearFilter = document.getElementById("year-filter");

        if (maleCheckbox.checked) {
          filterValuesSex.push(maleCheckbox.value);
        }

        if (femaleCheckbox.checked) {
          filterValuesSex.push(femaleCheckbox.value);
        }

        if (kittenFilter.checked) {
          monthFilter.style.display = "block";
          yearFilter.style.display = "none";
          minMonth = parseInt($("#min-month").val());
          maxMonth = parseInt($("#max-month").val());
          minYear = 0;
          maxYear = 0;
        }

        if (adultFilter.checked) {
          monthFilter.style.display = "none";
          yearFilter.style.display = "block";
          minYear = parseInt($("#min-years").val());
          maxYear = parseInt($("#max-years").val());
          minMonth = 0;
          maxMonth = 11;
        }
        const filteredCats = filterCats(
          data,
          filterValuesSex,
          minMonth,
          maxMonth,
          minYear,
          maxYear
        ); // Фильтруем котиков
        renderCats(filteredCats); // Отображаем отфильтрованных котиков
      }
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));

  const modal = document.getElementById("modal");
  // Закрытие модального окна по крестику
  modal.addEventListener("close", function () {
    modal.close();
    const scriptScrollImg = document.getElementById("scrollImg");
    if (scriptScrollImg) {
      scriptScrollImg.remove();
    }
  });

  // Закрытие модального окна при клике вне его области
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.close();
      const scriptScrollImg = document.getElementById("scrollImg");
      if (scriptScrollImg) {
        scriptScrollImg.remove();
      }
    }
  });
});
