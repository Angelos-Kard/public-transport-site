// https://codepen.io/lehollandaisvolant/pen/ryrrGx

const navbar = document.querySelector("nav");
let scrollPosition = 0;

window.addEventListener("scroll", function () {

    if( (document.body.getBoundingClientRect()).top > scrollPosition ) { 
        navbar.className = "show"; 
    }
    else {
        if ( navbar.classList.contains("show") )
            navbar.classList.remove("show");
    }
    scrollPosition = (document.body.getBoundingClientRect()).top;
});