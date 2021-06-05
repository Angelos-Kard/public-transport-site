let script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
script.async = true;
document.head.appendChild(script);

window.initMap = function() {
    let map;

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 13,
    });

    console.log(document.title);

    fetch("/allStopsMap")
    .then((response) => response.json())
    .then((response) => {
        


    })

    


};

const eqfeed_callback = function (results) {

    for (let i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);
        new google.maps.Marker({
        position: latLng,
        map: map,
        });
    }

};