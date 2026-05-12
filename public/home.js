var map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  minZoom: 2,
  maxZoom: 12,
  zoomControl: false,
  worldCopyJump: true,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0,
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
