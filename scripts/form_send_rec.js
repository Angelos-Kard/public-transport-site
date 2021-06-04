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
            
            console.log(response);
    })
}


let form = document.querySelector("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

const theBtn = document.querySelector(".submitbutton")

theBtn.addEventListener("click", bringData);

