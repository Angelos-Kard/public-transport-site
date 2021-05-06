const newsHome = document.getElementById("latestNews");

for( let i = 0 ; i < 3 ; i++ ) {

    let newInHome = document.createElement("div");
    newInHome.className = "articleNews";
    newInHome.addEventListener("click", function() {
        location.href = "news.html#" + newsList[i][3];
    });

    let newsTitle = document.createElement("h3");
    newsTitle.textContent = newsList[i][1];
    newInHome.appendChild(newsTitle);

    let newsDate = document.createElement("span");
    newsDate.textContent = "Ημερομηνία: " + newsList[i][0];
    newInHome.appendChild(newsDate);

    newsHome.appendChild(newInHome);

}
