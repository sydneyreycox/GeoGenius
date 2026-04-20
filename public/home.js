var map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  zoomControl: false,
  worldCopyJump: true
})

fetch('/api/cities')
  .then(response => response.json())
  .then(data => {
    data.cities.forEach(city => {
      L.marker([city.lat, city.lng]).addTo(map)
        .bindPopup(city.name);
    });
  })

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	noWrap: true,
  maxBoundsViscosity: 1.0,
  attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}).addTo(map);
