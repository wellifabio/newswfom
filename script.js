const uri = "https://newsapi-phi.vercel.app/";
const news = document.querySelector(".news");
const create = document.getElementById("create");
const update = document.getElementById("update");

fetch(uri)
    .then(response => response.json())
    .then(data => {
        data.forEach(n => {
            const card = document.createElement('div');
            card.classList.add("card");
            card.innerHTML = `
        <h3>${n.title}</h3>
        <img src="${n.img}" alt="${n.title}">
        <p>${n.content}</p>
        <p>
            <button onclick="alterar('${n.id}','${n.title}','${n.content}','${n.img}')">Alterar</button>
            <button onclick="excluir(${n.id})">Excluir</button>
        </p>`;
            news.appendChild(card);
        });
    });

function alterar(i, tit, cont, im) {
    alteracao.classList.remove('oculto');
    id.value = i;
    title.value = tit;
    content.innerHTML = cont;
    img.value = im != './assets/eu.webp' ? im : "";
}

create.addEventListener('submit', e => {
    e.preventDefault();
    const dados = {
        title: create.title.value,
        content: create.content.value,
        img: create.img.value != '' ? create.img.value : './assets/eu.webp'
    }
    fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    })
        .then((resp) => resp.status)
        .then((status) => {
            if (status === 201) {
                alert("Notícia cadastrada com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao cadastrar notícia!");
            }
        });
});

update.addEventListener('submit', e => {
    e.preventDefault();
    const dados = {
        id: Number(update.id.value),
        title: update.title.value,
        content: update.content.value,
        img: update.img.value != '' ? update.img.value : './assets/eu.webp'
    }
    fetch(uri, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    })
        .then((resp) => resp.status)
        .then((status) => {
            if (status === 202) {
                alert("Notícia alterada com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao alterar notícia!");
            }
        });
});

function excluir(id) {
    if (confirm(`Confirma a exclusão da notícia ${id}`)) {
        fetch(uri + id, {
            method: "DELETE",
        })
            .then((resp) => resp.status)
            .then((status) => {
                if (status == 204) {
                    alert("Notícia excluída com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao excluir notícia!");
                }
            });
    }
}