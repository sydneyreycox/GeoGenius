var corner1 = L.latLng(40.712, -74.227)
var corner2 = L.latLng(40.774, -74.125)
var bounds = L.latLngBounds(corner1, corner2);

var map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  zoomControl: false,
  worldCopyJump: true,
  bounds: bounds,
  maxBoundsViscosity: 1,
});


fetch('/api/cities')
  .then(response => response.json())
  .then(data => {
    data.cities.forEach(city => {
      const marker = L.marker([city.lat, city.lng]).addTo(map);

      marker.on('click', () => {
        window.location.href = `/city/${city.id}`;     
      });

      marker.bindPopup(city.name);
    });
  });


L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	noWrap: true,
  maxBoundsViscosity: 1.0,
  attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}).addTo(map);
