const uri = "https://newsapi-phi.vercel.app/";
const news = document.querySelector(".news");

fetch(uri)
    .then(response => response.json())
    .then(data => {
        data.forEach(n => {
            const card = document.createElement('div');
            card.classList.add("card");
            card.innerHTML = `
        <h3>${n.title}</h3>
        <img src="${n.img}" alt="${n.title}">
        <p>${n.content}</p>`;
            news.appendChild(card);
        });
    });
