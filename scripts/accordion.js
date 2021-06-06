const acc = document.getElementsByClassName("accordion"); //The accordion "buttons"
const main_boxes = document.querySelectorAll(".main-box"); //div that includes the .accordion elements

//Making the .accordion nodes clickable
for (let i = 0; i < acc.length; i++) {
    
    acc[i].addEventListener("click", function() {

        this.classList.toggle("active");

        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } 
        else {
            panel.style.display = "block";
        }
    });
}
