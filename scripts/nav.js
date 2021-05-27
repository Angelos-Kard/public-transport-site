// https://codepen.io/lehollandaisvolant/pen/ryrrGx

const navbar = document.querySelector("nav");
let scrollPosition = 0;

const scrollToTop = document.createElement("button");
scrollToTop.className = "topButton";
scrollToTop.textContent = "↑";
scrollToTop.addEventListener("click", function (){
    document.documentElement.scrollTo({top: 0 , behavior: "smooth"});
});
document.querySelector('h1').appendChild(scrollToTop);

window.addEventListener("scroll", function () {

    if( window.pageYOffset >= navbar.offsetTop ) 
    {
        navbar.className = "show"; 
        document.querySelector(".dropdown-content").style.top = "50px";
    }
    else if ( navbar.classList.contains("show") )
    {
        navbar.classList.remove("show");
        document.querySelector(".dropdown-content").style.top = "188px";
    }

    ( scrollPosition < -200 ) ? scrollToTop.style.display = "block" : scrollToTop.style.display = "none";

    scrollPosition = (document.body.getBoundingClientRect()).top;
});