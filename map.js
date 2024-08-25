var map = L.map('map').setView([0, 0], 1);

L.tileLayer('images/{z}/{x}/{y}.jpg', {
	minZoom: 1,
	maxZoom: 5,
	noWrap: true,
	tms: false,	
	crs: L.CRS.Simple,
}).addTo(map);

var coordDisplay = document.getElementById('coordinates');

map.on('mousemove', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    coordDisplay.innerHTML = `Koordinaten: ${Math.round(coord.lat)}, ${Math.round(coord.lng)}`;
});


map.on('contextmenu', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    var coordText = `${Math.round(coord.lat)}, ${Math.round(coord.lng)}`;
   
    navigator.clipboard.writeText(coordText).then(function() {        
	alert('Koordinaten kopiert: ' + coordText);
    }).catch(function(err) {
        // wenn Fehler kam
        console.error('Fehler beim Kopieren: ', err);
    });
});