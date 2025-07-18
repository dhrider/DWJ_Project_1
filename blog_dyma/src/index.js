import "./assets/style/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");

const createArticles = articles => {
    const articlesDOM = articles.map(article => {
        const articleDOM = document.createElement("div");
        articleDOM.classList.add("article");
        articleDOM.innerHTML = `
<img
  src="${article.img}"
  alt="profile"
/>
<h2>${article.title}</h2>
<p class="article-author">${article.author} - ${article.category}</p>
<p class="article-content">
  ${article.content}
</p>
<div class="article-actions">
  <button class="btn btn-danger" data-id=${article._id} >Supprimer</button>
</div>
`;
        return articleDOM;
    });
    articleContainerElement.innerHTML = "";
    articleContainerElement.append(...articlesDOM);
    const deleteButtons = articleContainerElement.querySelectorAll('.btn-danger')
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', async (e) => {
            try {
                const target = e.target;
                const id = target.dataset.id;
                const response = await fetch(`https://restapi.fr/api/article/${id}`, {
                    method: "DELETE",
                })
                const body = await response.json();
                fetchArticle()
            } catch (e) {
                console.error(e);
            }

        })
    })
};

const fetchArticle = async () => {
    try {
        const response = await fetch("https://restapi.fr/api/article");
        let articles = await response.json();
        // Restapi retourne un objet s'il n'y a qu'un seul article
        // nous devons donc le transformer en tableau :
        if (!Array.isArray(articles)) {
            articles = [articles];
        }
        createArticles(articles);
    } catch (e) {
        console.log("e : ", e);
    }
};

fetchArticle();