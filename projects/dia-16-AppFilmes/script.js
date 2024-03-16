const apiKey = "faf26336";
const formSearch = document.querySelector('form');
const home = document.getElementById('home');
const movies = document.getElementById('movies');
const series = document.getElementById('series');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageNumber = document.getElementById('page-number');

let currentPage = 1;
let currentSearch = '';
let currentType = '';
let isHome = false;

const fetchContent = (search, type, page, isHome = false) => {
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`;

    if (type) {
        url += `&type=${type}`;
    }

    fetch(url)
        .then(result => result.json())
        .then(json => updateUI(json, isHome))
        .catch(error => console.error('Erro ao buscar conteúdo:', error));
};

const updateUI = (json) => {
    const list = document.querySelector('div#movies-list');
    list.innerHTML = '';
    pageNumber.textContent = `Página ${currentPage}`;

    if (isHome) {
        const homeDiv = document.createElement('div');
        homeDiv.classList.add('home-special');
        homeDiv.innerHTML = `
        <div class="header">
           <h2>Bem-vindo à <span>Fafo.TV!</span></h2>
           <h3>Explore, assista, apaixone-se.</h3>
           <p>Descubra um universo de filmes e séries sem limites, onde as novidades se encontram com os clássicos. 
           Na Fafo.TV, cada click te leva a uma nova aventura. Prepare a pipoca, acomode-se e deixe-se envolver pelas 
           histórias mais envolventes que o cinema e a televisão têm a oferecer. Seu próximo filme favorito espera por você aqui!</p>
        </div>
        `;
        list.appendChild(homeDiv);
    }

    if (json.Response == 'False') {
        alert('Nenhum filme encontrado!');
        return;
    }

    json.Search.forEach(element => {
        let item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `<img src="${element.Poster}" onerror="this.onerror=null;this.src='path/to/default/image.png';"/> <h3>${element.Title}</h3>`;
        list.appendChild(item);
    });
};


home.addEventListener('click', () => {
    currentSearch = 'all';
    currentType = '';
    currentPage = 1;
    isHome = true;
    fetchContent(currentSearch, currentType, currentPage, isHome);
});


movies.addEventListener('click', () => {
    currentSearch = 'all';
    currentType = 'movie';
    currentPage = 1;
    isHome = false;
    fetchContent(currentSearch, currentType, currentPage);
});

series.addEventListener('click', () => {
    currentSearch = 'all';
    currentType = 'series';
    currentPage = 1;
    isHome = false;
    fetchContent(currentSearch, currentType, currentPage);
});

prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage -= 1;
        fetchContent(currentSearch, currentType, currentPage);
    }
});

next.addEventListener('click', () => {
    currentPage += 1;
    fetchContent(currentSearch, currentType, currentPage);
});

formSearch.onsubmit = (e) => {
    e.preventDefault();
    const search = e.target.input_search.value.trim();

    if (search === '') {
        alert("Preencha o campo!");
        return;
    }

    currentSearch = search;
    currentType = '';
    currentPage = 1;
    fetchContent(currentSearch, currentType, currentPage);
};

document.addEventListener("DOMContentLoaded", () => {
    home.click();
});
