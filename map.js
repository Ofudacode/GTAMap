var map = L.map('map').setView([0, 0], 2);

map.attributionControl.addAttribution('Last updated: 29.08.2024'); // Last Updated unten rechts

L.tileLayer('images/{z}/{x}/{y}.jpg', {
    minZoom: 1,
    maxZoom: 5,
    noWrap: true,
    tms: false,    
    crs: L.CRS.Simple,
}).addTo(map);

var coordDisplay = document.getElementById('coordinates');

var marker = L.marker([-51.99, -47.46]).addTo(map);
marker.bindPopup("Marker 1!");
var marker2 = L.marker([-51.89, -47.68]).addTo(map);
marker2.bindPopup("Marker 2!");

map.on('mousemove', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    var latRounded = Math.round(coord.lat * 100) / 100;
    var lngRounded = Math.round(coord.lng * 100) / 100;
    coordDisplay.innerHTML = `Koordinaten: ${latRounded}, ${lngRounded}`;
});

map.on('contextmenu', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    var latRounded = Math.round(coord.lat * 100) / 100;
    var lngRounded = Math.round(coord.lng * 100) / 100;
    var coordText = `${latRounded}, ${lngRounded}`;
   
    navigator.clipboard.writeText(coordText).then(function() {        
        alert('Koordinaten kopiert: ' + coordText);
    }).catch(function(err) {
        // wenn Fehler kam
        console.error('Fehler beim Kopieren: ', err);
    });
});
