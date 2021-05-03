
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

d3.json(earthquakesURL, function(earthquakeData) {
  function markerSize(magnitude) {
    return magnitude * 3;
  };

  L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          radius: markerSize(feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: .8,
          weight: .4,
          color: "black",
          stroke: true,
        }
      );
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
      + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
  }).addTo(earthquakes);
  earthquakes.addTo(myMap);

  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "maroon";
      case depth > 70:
        return "red";
      case depth > 50:
        return "orange";
      case depth > 30:
        return "gold";
      case depth > 10:
        return "yellow";
      default:
        return "tan";
    }
  };
  
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
  for (var i =0; i < depth.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }
    return div;
  };
  legend.addTo(myMap);

  var legend = L.control({position: "bottomright"});

});