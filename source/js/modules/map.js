import L from 'leaflet';

const ZOOM = 18;
const MIN_SIZE = 38;
const MAX_SIZE = 50;
const MIN_SIZE_ANCHOR = 4;
const MAX_SIZE_ANCHOR = 24;
const BASE_COORDS = {
  lat: 41.4036339,
  lng: 2.1717809
};

const initMap = (mapElement) => {
  const map = L.map(mapElement.id, { scrollWheelZoom: false }).setView(BASE_COORDS, ZOOM);

  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    minZoom: 10,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(map);

  const pinIcon = L.marker(BASE_COORDS, {
    icon: L.icon({
      iconUrl: 'img/sprite.svg#map-pin',
      iconSize: [MIN_SIZE, MAX_SIZE],
      iconAnchor: [MIN_SIZE_ANCHOR, MAX_SIZE_ANCHOR]
    })
  });

  pinIcon.addTo(map);
};

export const initMaps = () => {
  document.querySelectorAll('.map[id]').forEach(initMap);
};
