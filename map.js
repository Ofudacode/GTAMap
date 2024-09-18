// JSON Datei
async function loadLocations() {
    try {
        const response = await fetch('dealerinfos.json'); // Pfad zur JSON Datei im Ordner
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden der JSON-Datei:', error);
        return [];
    }
}

// Map wird geladen
async function initMap() {
    const locations = await loadLocations();

    var map = L.map('map').setView([0, 0], 2); // Map View bei Start auf Koords 00 und 2 Zoom setview für etwas größere map view

    map.attributionControl.addAttribution('Last updated: 17.09.2024'); // Last Updated unten rechts

    L.tileLayer('images/{z}/{x}/{y}.jpg', { // Map
        minZoom: 1,
        maxZoom: 5,
        noWrap: true,
        tms: false,
        crs: L.CRS.Simple,
    }).addTo(map);

    var coordDisplay = document.getElementById('coordinates'); // Koordinaten unten Links

    // JSON Daten auslesen und verwenden
    locations.forEach(location => {
        const [lat, lng] = location.pos.split(',').map(Number);
        var marker = L.marker([lat, lng]).addTo(map); // Marker setzen

        // Popup Content anpassen der kleinen Blase
        var popupContent = `
            <div style="font-size: 16px;">
                <b>${location.name}</b>
            </div>
            <div>
                <a href="#" class="popupLink" data-img="${location.img}" style="font-size: 14px;">Bild anzeigen</a>
            </div>
        `;

        marker.bindPopup(popupContent);
    });

    map.on('mousemove', function(e) { // Mauszeiger Koordinaten
        var coord = map.mouseEventToLatLng(e.originalEvent);
        var latRounded = Math.round(coord.lat * 100) / 100;
        var lngRounded = Math.round(coord.lng * 100) / 100;
        coordDisplay.innerHTML = `Koordinaten: ${latRounded}, ${lngRounded}`;
    });

    map.on('contextmenu', function(e) { // Koordinaten mit Rechtsklick kopieren
        var coord = map.mouseEventToLatLng(e.originalEvent);
        var latRounded = Math.round(coord.lat * 100) / 100;
        var lngRounded = Math.round(coord.lng * 100) / 100;
        var coordText = `${latRounded}, ${lngRounded}`;
       
        navigator.clipboard.writeText(coordText).then(function() {        
            alert('Koordinaten kopiert: ' + coordText);
        }).catch(function(err) {
            // wenn Fehler gekommen ist
            console.error('Fehler beim Kopieren: ', err);
        });
    });
}

// Map erst anzeigen wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', initMap);

// Bild als Popup anzeigen lassen
function showPopup(imageUrl) {
    var popup = document.getElementById('imagePopup');
    var popupImage = document.getElementById('popupImage');

    popupImage.src = imageUrl;
    popup.style.display = 'block';
}

// Bild Popup schließen oben Rechts per X
document.querySelector('.close').addEventListener('click', function() {
    var popup = document.getElementById('imagePopup');
    popup.style.display = 'none';
});

// Bild Popup schließen wenn außerhalb des Popups geklickt wird
window.addEventListener('click', function(event) {
    var popup = document.getElementById('imagePopup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

// Wenn auf Link geklickt wird beim Popup "Bild oeffnen"
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('popupLink')) {
        event.preventDefault();
        var imageUrl = event.target.getAttribute('data-img');
        showPopup(imageUrl);
    }
});
