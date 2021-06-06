//Make the articles in the home page clickable
const newsHome = document.querySelectorAll(".articleNews");

for(let nodeI of newsHome) {
    
    nodeI.addEventListener("click", function() {
        location.href = "news.html#" + this.id;
    });

    
}
