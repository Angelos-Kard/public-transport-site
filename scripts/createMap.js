const map = document.querySelector("#line-map");

map.addEventListener("click", theCallback)

function theCallback () {
    let map;

        function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        }

        console.log(lol);
}

const lol =  "loooooo";