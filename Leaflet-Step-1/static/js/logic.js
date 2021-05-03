var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var earthquakes = L.layerGroup();

var grayscaleMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  tileSize: 520,
  maxZoom: 18,
  zoomOffset: -1,
});

var myMap = L.map("mapid", {
  center: [64.8378, -147.7164],
  zoom: 4,
  layers: [grayscaleMap, earthquakes]
});
