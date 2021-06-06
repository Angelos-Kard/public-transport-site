/**
 * A function that retrieves the user's position (coordinates)
 */
function bringData () {
    

    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(sendPosition);

    }
    else 
    {
        console.log("Geolocation is not supported by this browser.");
    }
}

/**
 * A function that finds the nearest bus stop.
 * 
 * The function sends the user's position to the server and it receives the nearest bus stop.
 * 
 * 
 * @param {String} position User's position (coordinates)
 */
function sendPosition (position) {

    const theValue = document.querySelector("#line").value;
    fetch("/nearest_stop", 
        {
            method: "POST",
            body: JSON.stringify({"answer": theValue, "position": position.coords.latitude+","+position.coords.longitude}),
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            }
        }
        )
        .then((response) => response.json())
        .then((response) => {

            const ans = document.querySelector("#min-stop");

            ans.style.display = "block";

            ans.addEventListener("click", () => window.location = `https://www.google.com/maps/search/?api=1&query=${response.coords}`)

            ans.innerHTML = `Η πλησιέστερη στάση της γραμμής είναι η στάση "<strong>${response.minStopName}</strong>"<br>\
            <hr class="solid">\
            Aπόσταση: <strong>${response.distance}</strong><br>\
            Χρόνος Άφιξης: <strong>${response.durationText}</strong><br>\
            Διεύθυνση: "<strong>${response.address}</strong>"<br>\
            <a href="https://www.google.com/maps/search/?api=1&query=${response.coords}" target="_blank">Δείτε τη στάση στο χάρτη</a>`
    })
}


let form = document.querySelector("form");
function handleForm(event) { event.preventDefault(); } //prevents page reload on click 
form.addEventListener('submit', handleForm);

const theBtn = document.querySelector(".submitbutton");
theBtn.addEventListener("click", bringData);