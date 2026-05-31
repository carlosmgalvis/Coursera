var map = L.map('main_map').setView([-34.6012424, -58.38614497], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/*
 marker = L.marker([-34.6012424, -58.3861497]).addTo(map);
 marker.bindPopup("<b>Estación 1</b><br>Dirección: Av. Corrientes 1234<br>Disponibles: 5").openPopup();


L.marker([-34.6012424, -58.3861497]).addTo(map);
L.marker([-34.596932, -58.3888287]).addTo(map);
L.marker([-34.599564, -58.3778777]).addTo(map);


$.ajax({
    url: '/api/bicicletas',
    dataType: 'json',
    success: function(result) {
        console.log(result);
        result.bicicletas.forEach(function(bici) {
            L.marker([bici.ubicacion[0],bici.ubicacion[1]]).addTo(map);
        });
    }
});
*/
fetch('/api/bicicletas')
    .then(response => response.json())
    .then(result => {
        console.log(result);
        result.bicicletas.forEach(function(bici) {
            L.marker(bici.ubicacion,{title: bici.id}).addTo(map);
        });
    })
    .catch(error => console.error('Error fetching data:', error));