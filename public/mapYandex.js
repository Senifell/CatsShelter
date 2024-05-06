document.addEventListener("DOMContentLoaded", function () {
  const POS_X = 37.584884;
  const POX_Y = 55.716317;

  initMap();

  async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapMarker,
      YMapDefaultFeaturesLayer,
      YMapControls,
      YMapControlButton,
    } = ymaps3;

    const { YMapZoomControl } = await ymaps3.import(
      "@yandex/ymaps3-controls@0.0.1"
    );

    // Иницилиазируем карту
    const map = new YMap(
      document.getElementById("map"),

      {
        zoomRange: { min: 10, max: 20 },
        location: {
          center: [POS_X, POX_Y],
          zoom: 15,
        },
      }
    );

    map.addChild(new YMapDefaultSchemeLayer());

    map.addChild(new YMapDefaultFeaturesLayer());

    const markerElement = document.createElement("img");
    markerElement.className = "marker-class";
    markerElement.src = "./image/map_logo.jpg";
    map.addChild(
      new YMapMarker({ coordinates: [POS_X, POX_Y] }, markerElement)
    );

    const controls = new YMapControls({ position: "top left" });
    const button = new YMapControlButton({
      text: "Приют",
      onClick: () => {
        map.setLocation({
          center: [POS_X, POX_Y],
          zoom: 17,
        });
      },
    });

    controls.addChild(button);
    map.addChild(controls);

    const controls1 = new YMapControls({ position: "left" });
    const zoom = new YMapZoomControl({
      easing: "linear",
    });
    controls1.addChild(zoom);

    map.addChild(controls1);
  }
});
