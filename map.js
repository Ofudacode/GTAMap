// Karte initialisieren
var map = L.map('map', {
    crs: L.CRS.Simple, // Verwende ein einfaches Koordinatensystem
    minZoom: 0,        // Erlaubt weit herausgezoomte Ansichten
    maxZoom: 5         // Begrenzter maximaler Zoom
});

// Bildgrößen festlegen (in Pixeln)
var mapWidth = 1000;  // Breite der Karte in Pixeln
var mapHeight = 1000; // Höhe der Karte in Pixeln

// Bildbegrenzungen festlegen (unten links, oben rechts)
var bounds = [[100, 100], [mapHeight, mapWidth]];

// Bildoverlay hinzufügen
// L.imageOverlay('https://www.bragitoff.com/wp-content/uploads/2015/11/GTAV-HD-MAP-satellite.jpg', bounds).addTo(map); Originale Map 8k
L.imageOverlay('https://www.bragitoff.com/wp-content/uploads/2015/11/GTAV_SATELLITE_2048x2048.png', bounds).addTo(map); // Map in 4k

// Karte auf das Bild zentrieren
map.fitBounds(bounds);

// Marker hinzufügen
var marker = L.marker([499, 404]).addTo(map);
var Vinewood1 = L.marker([800, 505]).addTo(map); 
var Vinewood2 = L.marker([473, 430]).addTo(map); 
var Vinewood3 = L.marker([320, 413]).addTo(map); 

// Popup zum Marker hinzufügen
marker.bindPopup("Gary ohne r!!").openPopup();
Vinewood1.bindPopup("Gary der Tester").openPopup();

// Element für die Koordinatenanzeige
var coordDisplay = document.getElementById('coordinates');

// Event-Listener für Mausbewegungen auf der Karte
map.on('mousemove', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    coordDisplay.innerHTML = `Koordinaten: ${Math.round(coord.lat)}, ${Math.round(coord.lng)}`;
});

// Event-Listener für Rechtsklicks
map.on('contextmenu', function(e) {
    var coord = map.mouseEventToLatLng(e.originalEvent);
    var coordText = `${Math.round(coord.lat)}, ${Math.round(coord.lng)}`;
    
    // Kopiere Koordinaten in die Zwischenablage
    navigator.clipboard.writeText(coordText).then(function() {
        // Erfolgreich kopiert
        alert('Koordinaten kopiert: ' + coordText);
    }).catch(function(err) {
        // Fehler beim Kopieren
        console.error('Fehler beim Kopieren: ', err);
    });
});
