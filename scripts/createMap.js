//"Importing" the Google Maps JS API
let script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
script.async = true;
document.head.appendChild(script);

/**
 * A functions that creates the map of the line's bus stops
 */
window.initMap = function() {
    let map;

    //Map Creation
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.232323861672306, lng: 21.75683034437515 },
        zoom: 13,
    });

    routeID = document.title.split(" - ")[0];

    //GET request - Server sends the details about the bus stops
    fetch(`/allStopsMap/${routeID}`)
    .then((response) => response.json())
    .then((response) => {

        //To fit the markers: https://stackoverflow.com/questions/3897744/automatically-adjust-zoom-to-accommodate-all-marker-in-a-google-map
        //let latlngbounds = new google.maps.LatLngBounds(); //Con: you cannot zoom

        const infowindow = new google.maps.InfoWindow(); //Creating pop up windows for the marker
        const markersArray = []; //An array of all the markers
        const coordsArray = []; //An array of all the coordinates

        for (let i in response)
        {
            const coords = response[i].geografikiThesi.split(",");
            const latLng = new google.maps.LatLng(coords[0], coords[1]);
            //latlngbounds.extend(latLng); //To fit the markers

            //icon selection based on the zone that the bus stop is in
            let theIcon;
            if ( i == 0 ) response[i].zoni == "A" ? theIcon = "/media/icons/busstop_startA.png" : theIcon = "/media/icons/busstop_startB.png";
            else if ( i == response.length-1 ) response[i].zoni == "A" ? theIcon = "/media/icons/busstop_endA.png" : theIcon = "/media/icons/busstop_endB.png";
            else response[i].zoni == "A" ? theIcon = "/media/icons/busstop_A.png" : theIcon = "/media/icons/busstop_B.png";


            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: response[i].onomaStasis,
                //Bus Stop icon by https://mapicons.mapsmarker.com/markers/transportation/road-transportation/bus-stop
                icon: theIcon
            });
            
            //Text for the pop up window
            const contentText = `<a href="https://www.google.com/maps/search/?api=1&query=${response[i].geografikiThesi}" target="_blank">Στάση: ${response[i].onomaStasis}</a>\
            <br>Ζώνη ${response[i].zoni}\
            <br>Αριθμός Στάσης: ${response[i].seira}`


            makeInfoWindowEvent(map, infowindow, contentText, marker);

            markersArray.push(marker);
            coordsArray.push(latLng);
        }


        //map.fitBounds(latlngbounds); //To fit the markers

        //Set the center of the map on the middle bus stop
        map.setCenter(new google.maps.LatLng(
            response[Math.ceil(response.length/2)].geografikiThesi.split(",")[0],
            response[Math.ceil(response.length/2)].geografikiThesi.split(",")[1]
        ));

        //Create a line that connects all the bus stops
        const connectLine = new google.maps.Polyline({
            path: coordsArray,
            geodesic: true,
            strokeColor: '#8ad8ed',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        
        connectLine.setMap(map);
    })

};

//https://stackoverflow.com/questions/11467070/how-to-set-a-popup-on-markers-with-google-maps-api
/**
 * A function that makes the markers clickable.
 * 
 * When a marker is clicked, a pop up window appears. 
 * 
 * @param {google.maps.Marker} map The map.
 * @param {google.maps.InfoWindow} infowindow The pop up window.
 * @param {String} contentString The text that the pop up window will have.
 * @param {google.maps.Marker} marker The marker. 
 */
function makeInfoWindowEvent(map, infowindow, contentString, marker) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}