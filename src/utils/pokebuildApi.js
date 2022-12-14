async function getAllPokemon() {
    try {

        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon")
        if(!response.ok) console.log("probleme api pokemon build get all pokemons"); 
        return response.json();
    } catch (err) {
        console.error("error: ", err);
    }
}

async function getPokemonById(id) {
  try {

      const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/"+id)
      if(!response.ok) console.log("probleme api pokemon build get pokemon by id"); 
      return response.json();
  } catch (err) {
      console.error("error: ", err);
  }
}

async function getPokemonByType(type) {
  try {
      const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/type/"+type)
      if(!response.ok) console.log("probleme api pokemon build get all pokemons by type"); 
      return response.json();
  } catch (err) {
      console.error("error: ", err);
  }
}

async function getPokemonByGen(gen) {
  try {
      const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/generation/"+gen)
      if(!response.ok) console.log("probleme api pokemon build get all pokemons by type"); 
      return response.json();
  } catch (err) {
      console.error("error: ", err);
  }
}

async function getAllType(){
    try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/types");
        if(!response.ok) console.log("probleme api pokemon build get all types"); 
        return response.json();
    } catch (error) {
        console.error("error: ", err);
    }
}

async function getDefensiveCoverage(pokeTeam) {
    if(pokeTeam[0]==-1){
        return;
    }
    
    let pokeTeamRequest = [];
    let index = 0;

    while (pokeTeam[index] != -1 && index < 6) {
        let newPoke = {};
        newPoke[pokeTeam[index]] = "";
        pokeTeamRequest.push(newPoke);
        index++;
    }

    try {
        const options = {
          method: "POST",
          body: JSON.stringify(pokeTeamRequest),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch("https://pokebuildapi.fr/api/v1/team/defensive-coverage/v2", options);
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
        
        return await response.json();
      } catch (err) {
        console.error("error: ", err);
      }
}

export {
    getAllPokemon,
    getAllType,
    getDefensiveCoverage,
    getPokemonByType,
    getPokemonByGen,
    getPokemonById
};