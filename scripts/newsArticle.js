//DEPRECATED

const news = document.getElementById("news");

for( let i = 0 ; i < newsList.length ; i++ ) {

    let newHeadline = document.createElement("div");
    newHeadline.className = "article";
    newHeadline.id = newsList[i][3];
    
    let headlineTitle = document.createElement("h3");
    headlineTitle.textContent = newsList[i][1];
    newHeadline.appendChild(headlineTitle)

    let headlineDate = document.createElement("span");
    headlineDate.textContent = "Ημερομηνία: " + newsList[i][0];
    newHeadline.appendChild(headlineDate);

    let headlineArticle = document.createElement("article");
    headlineArticle.textContent = newsList[i][2];
    newHeadline.appendChild(headlineArticle);

    news.appendChild(newHeadline);

}