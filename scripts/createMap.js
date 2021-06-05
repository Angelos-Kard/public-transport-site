let script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
script.async = true;
document.head.appendChild(script);

window.initMap = function() {
    let map;

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.232323861672306, lng: 21.75683034437515 },
        zoom: 13,
    });

    routeID = document.title.split(" - ")[0];

    fetch(`/allStopsMap/${routeID}`)
    .then((response) => response.json())
    .then((response) => {

        //To fit the markers: https://stackoverflow.com/questions/3897744/automatically-adjust-zoom-to-accommodate-all-marker-in-a-google-map
        //let latlngbounds = new google.maps.LatLngBounds();

        const infowindow = new google.maps.InfoWindow();
        const markersArray = [];
        const coordsArray = [];
        for (let i in response)
        {
            const coords = response[i].geografikiThesi.split(",");
            const latLng = new google.maps.LatLng(coords[0], coords[1]);
            //latlngbounds.extend(latLng);



            const marker = new google.maps.Marker({
            position: latLng,
            map: map,
            //label: response[i].seira.toString(),
            title: response[i].onomaStasis })
            
            
            const contentText = `<a href="https://www.google.com/maps/search/?api=1&query=${response[i].geografikiThesi}" target="_blank">Στάση: ${response[i].onomaStasis}</a>`

            makeInfoWindowEvent(map, infowindow, contentText, marker);

            markersArray.push(marker);
            coordsArray.push(latLng);
        }


        //map.fitBounds(latlngbounds);

        map.setCenter(new google.maps.LatLng(
            response[Math.ceil(response.length/2)].geografikiThesi.split(",")[0],
            response[0].geografikiThesi.split(",")[1]
        ));

        const connectLine = new google.maps.Polyline({
            path: coordsArray,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        
        connectLine.setMap(map);
    })

};

//https://stackoverflow.com/questions/11467070/how-to-set-a-popup-on-markers-with-google-maps-api
function makeInfoWindowEvent(map, infowindow, contentString, marker) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}