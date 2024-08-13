class Api{
  constructor(){

  }

  async getspecificpokemon(pokemon_name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
    const data = await response.json()
    
    return data
  }

  async getallPokemonname(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`)
    const data = await response.json()
    
    return data
  }
  async getspecies(pokemon_name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`)     
    const data = await response.json()

    return data
  }
  async evo_chain(id){
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
    const data = await response.json()
    return data;
  }

}

const api = new Api()



export { api }

