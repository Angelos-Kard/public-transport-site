// https://codepen.io/lehollandaisvolant/pen/ryrrGx

const navbar = document.querySelector("nav"); //the main menu
let scrollPosition = 0;

const scrollToTop = document.createElement("button"); //a button to scroll to top
scrollToTop.className = "topButton";
scrollToTop.textContent = "↑";
scrollToTop.addEventListener("click", function (){
    document.documentElement.scrollTo({top: 0 , behavior: "smooth"});
});
document.querySelector('main').appendChild(scrollToTop);

const hamburger = document.querySelector(".hamburger"); //the hamburger menu (mobile only)
const togglerItem = document.querySelector(".toggler");

//Create a sticky menu (pc)
//Change the dimensions of the hamburger menu button (mobile)
window.addEventListener("scroll", function () {

    if( window.pageYOffset >= navbar.offsetTop ) 
    {
        navbar.className = "show"; 
        document.querySelector(".dropdown-content").style.top = "50px";

        hamburger.style.width = "40px";
        hamburger.style.height = "40px";
        hamburger.style.padding = "15px";

        togglerItem.style.width = "65px";
        togglerItem.style.height = "65px";
        
    }
    else if ( navbar.classList.contains("show") )
    {
        navbar.classList.remove("show");
        document.querySelector(".dropdown-content").style.top = "188px";
    }

    ( scrollPosition < -200 ) ? scrollToTop.style.display = "block" : scrollToTop.style.display = "none";

    scrollPosition = (document.body.getBoundingClientRect()).top;

    if ( scrollPosition >= -1 )
    {
        hamburger.style.width = "57px";
        hamburger.style.height = "67px";
        hamburger.style.padding = "35px";

        togglerItem.style.width = "125px";
        togglerItem.style.height = "130px";
    }

});