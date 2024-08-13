import {data} from './data.js'
let generation_to_region = {
  1: "Kanto",
  2: "Johto",
  3: "Hoenn",
  4: "Sinnoh",
  5: "Unova",
  6: "Kalos",
  7: "Alola",
  8: "Galar",
  9: "Paldea"
}

let ability = ''
let stats = ''
let  get_type = ''
let description = ''
let generation = ''
let evo = ''
let region = ''
const detailContainer = document.querySelector(".detail-container"); 

const detail_mon = localStorage.getItem('detail_mon');
if (detail_mon) {
  const card = document.createElement('div');
  card.classList.add('detail-pokemon');
  card.innerHTML = `<p>${detail_mon}</p>`;

  detailContainer.innerHTML = ''; 
  detailContainer.appendChild(card);
  

  
}

async function detail(){
  ability = await data.get_ability(detail_mon)
  stats = await data.get_stats(detail_mon)
  get_type = await data.get_type(detail_mon)
  description = await data.get_description(detail_mon)
  generation = await data.get_generation(detail_mon)
  evo = await data.get_evo(detail_mon)
  region = generation_to_region[generation]
}

detail()








