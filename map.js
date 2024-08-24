// Karte initialisieren nh
var map = L.map('map', {
    crs: L.CRS.Simple, // einfaches Koordinatensystem
    minZoom: 0,        // Erlaubt weit herausgezoomte Ansichten
    maxZoom: 5         // maximaler Zoom begrenzt
});

// Bildgrößen festlegen (in Pixeln)
var mapWidth = 1000;  // Breite der Karte in Pixeln
var mapHeight = 1000; // Höhe der Karte in Pixeln

// Bildbegrenzungen festlegen (unten links, oben rechts)
var bounds = [[100, 100], [mapHeight, mapWidth]];

// Bildoverlay hinzufügen
L.imageOverlay('images/gtavmap.jpg', bounds).addTo(map);

// Karte auf Bild zentrieren
map.fitBounds(bounds);

// Marker hinzufügen
var marker = L.marker([499, 404]).addTo(map);
var Vinewood1 = L.marker([800, 505]).addTo(map); 
var Vinewood2 = L.marker([473, 430]).addTo(map); 
var Vinewood3 = L.marker([320, 413]).addTo(map); 

// Popup 
marker.bindPopup("Gary ohne r!!").openPopup();
Vinewood1.bindPopup("Gary der Tester").openPopup();

// Element für die Koordinatenanzeige
var coordDisplay = document.getElementById('coordinates');

// Mausbewegungen auf der Karte
map.on('mousemove', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    coordDisplay.innerHTML = `Koordinaten: ${Math.round(coord.lat)}, ${Math.round(coord.lng)}`;
});

// Rechtsklicks speichert Koords
map.on('contextmenu', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    var coordText = `${Math.round(coord.lat)}, ${Math.round(coord.lng)}`;
    
    // Koords in Zwischenablage kopieren
    navigator.clipboard.writeText(coordText).then(function() {
        // Meldung erfolgreich kopiert
        alert('Koordinaten kopiert: ' + coordText);
    }).catch(function(err) {
        // wenn Fehler kam
        console.error('Fehler beim Kopieren: ', err);
    });
});
