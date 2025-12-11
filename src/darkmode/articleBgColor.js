
function setArticleBg(color) {
    const articles = [
        ...document.querySelectorAll('.article'),
        ...document.querySelectorAll('.article section'),
    ];
    for (const article of articles) {
        article.style.background = color;
    }
}