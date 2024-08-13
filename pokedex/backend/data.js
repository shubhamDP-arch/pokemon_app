import { api } from "./api.js";

const max_pokemon = 1303;

class DataFetch {
  constructor() {}

  async all_pokemon() {
    const allpokemon = await api.getallPokemonname();
    const all = allpokemon.results.map(pokemon => pokemon.name);
    return all;
  }

  async get_pokemon(pokemon_name) {
    const specific_pokemon = await api.getspecificpokemon(pokemon_name);
    return specific_pokemon;
  }

  async get_ability(pokemon_name) {
    const specific_pokemon = await this.get_pokemon(pokemon_name);
    return specific_pokemon.abilities[0].ability.name;
  }

  async get_stats(pokemon_name) {
    const specific_pokemon = await this.get_pokemon(pokemon_name);
    const stats = {};
    for (let i = 0; i < specific_pokemon.stats.length; i++) {
      stats[specific_pokemon.stats[i].stat.name] = specific_pokemon.stats[i].base_stat;
    }
    return stats;
  }

  async get_type(pokemon_name) {
    const specific_pokemon = await this.get_pokemon(pokemon_name);
    const types = specific_pokemon.types.map(typeInfo => typeInfo.type.name);
    return types;
  }
  async get_id(pokemon_name){
    const specific_pokemon = await this.get_pokemon(pokemon_name);
    const id = specific_pokemon.id;
    return id;
  }
  async get_species(pokemon_name){
    const species = await api.getspecies(pokemon_name)
    return species 
  }
  async get_description(pokemon_name){
    const specific_pokemon = await this.get_species(pokemon_name)
    const description = specific_pokemon.flavor_text_entries[0].flavor_text;
    return description;

  }
  async get_generation(pokemon_name){
    const specific_pokemon = await this.get_species(pokemon_name)
    const generation = specific_pokemon.generation.name
    return generation
  }
  async get_evo(pokemon_name){
    const id = await this.get_id(pokemon_name)
    const chain = await api.evo_chain(id)
    const pre = chain.chain.species.name
    const mid = chain.chain.evolves_to[0].species.name
    const post = chain.chain.evolves_to[0].evolves_to[0].species.name
    return [pre, mid ,post]
  } 

}

const data = new DataFetch();

export { data };
