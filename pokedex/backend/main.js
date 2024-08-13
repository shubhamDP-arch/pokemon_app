import { data } from "./data.js";

const max_pokemon = 1025;
const all_pokemon = await data.all_pokemon();
const id_list = await createId(all_pokemon);
let detail_mon = 'shu';
let id = 0;

async function display(pokemon, max_pokemon, id_list) {
  const fragment = document.createDocumentFragment();
  const displayContainer = document.querySelector(".display-all-view");

  for (let i = 0; i < max_pokemon; i++) {
    const p = id_list[i];
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.setAttribute('data-pokemon-name', pokemon[i]);
    card.setAttribute('data-id', i + 1);

    const nameWrapper = document.createElement('div');
    nameWrapper.classList.add('name-wrapper');
    nameWrapper.innerHTML = `<p>${pokemon[i]}</p>`;
    card.appendChild(nameWrapper);

    const idWrapper = document.createElement('div');
    idWrapper.classList.add('id-wrapper');
    idWrapper.innerHTML = `<p># ${i + 1}</p>`;
    card.appendChild(idWrapper);

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-wrapper');
    imgWrapper.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p}.png" alt="pokemon Image">`;
    card.appendChild(imgWrapper);

    fragment.appendChild(card);
  }

  displayContainer.innerHTML = '';
  displayContainer.appendChild(fragment);

  let inputElement = document.querySelector(".search-input");
  inputElement.addEventListener('keyup', debounce(search, 100));
  displayContainer.addEventListener('click', get_click);
}

function search() {
  let search_out = [];
  let inputElement = document.querySelector(".search-input"); 
  let searchTerm = inputElement.value.toLowerCase();

  all_pokemon.forEach(pokemon => {
    if (pokemon.toLowerCase().startsWith(searchTerm)) {
      search_out.push(pokemon);
    }
  });

  const revised_list = search_out;
  createId(revised_list).then(revised_id_list => {
    display(revised_list, revised_list.length, revised_id_list);
  });
}

function get_click(event) {
  const card = event.target.closest('.pokemon-card');
  if (!card) return;

  detail_mon = card.dataset.pokemonName;
  id = card.dataset.id;
  detail_display(detail_mon);
}

function detail_display(pokemon) {
  localStorage.setItem('detail_mon', pokemon);
  localStorage.setItem('id', id);
  window.open("detail.html", "_self");
}

async function createId(pokemon) {
  const promises = pokemon.map(p => data.get_id(p));
  const id_list = await Promise.all(promises);
  return id_list;
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

display(all_pokemon, max_pokemon, id_list);
