const acc = document.getElementsByClassName("accordion");
const main_boxes = document.querySelectorAll(".main-box");

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
