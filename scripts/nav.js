// https://codepen.io/lehollandaisvolant/pen/ryrrGx

const navbar = document.querySelector("nav");
let scrollPosition = 0;

window.addEventListener("scroll", function () {

    if( window.pageYOffset >= navbar.offsetTop ) 
    { 
        navbar.className = "show"; 
        document.querySelector(".dropdown-content").style.top = "50px";

    }
    else {
        if ( navbar.classList.contains("show") )
        {
            navbar.classList.remove("show");
            document.querySelector(".dropdown-content").style.top = "188px";
        }
            
    }
    scrollPosition = (document.body.getBoundingClientRect()).top;
});