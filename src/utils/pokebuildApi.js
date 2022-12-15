const defaultTypes = [ { "name": "Normal", "result": "balanced", }, { "name": "Combat", "result": "balanced", }, { "name": "Vol", "result": "balanced", }, { "name": "Poison", "result": "balanced", }, { "name": "Sol", "result": "balanced", }, { "name": "Roche", "result": "balanced", }, { "name": "Insecte", "result": "balanced", }, { "name": "Spectre", "result": "balanced", }, { "name": "Acier", "result": "balanced", }, { "name": "Feu", "result": "balanced", }, { "name": "Eau", "result": "balanced", }, { "name": "Plante", "result": "balanced", }, { "name": "Électrik", "result": "balanced", }, { "name": "Psy", "result": "balanced", }, { "name": "Glace", "result": "balanced", }, { "name": "Dragon", "result": "balanced", }, { "name": "Ténèbres", "result": "balanced", }, { "name": "Fée", "result": "balanced", } ]
async function getAllPokemon() {
    try {

        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon")
        if(!response.ok) console.log("probleme api pokemon build get all pokemons"); 
        return await response.json();
    } catch (err) {
        console.error("error: ", err);
    }
}
async function getOnePokemon(id) {
    try {

        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/"+id);
        if(!response.ok) console.log("probleme api pokemon build get one pokemons");
        return await response.json();
    } catch (err) {
        console.error("error: ", err);
    }
}

async function getAllType(){
    try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/types");
        if(!response.ok) console.log("probleme api pokemon build get all types"); 
        return await response.json();
    } catch (error) {
        console.error("error: ", err);
    }
}

async function getDefensiveCoverage(pokeTeam) {
    if(pokeTeam[0]==-1){
        return defaultTypes;
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

async function getPokemonsFromGen(gen){
  try {
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/generation/"+gen);
    if (!response.ok) {
      console.log("probleme api pokemon build get from gen");
    }

    return await response.json();
  } catch (err) {
    console.error("error: ", err);
  } 
}

async function getPokemonsFromType(type){
  try {
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/type/"+type);
    if (!response.ok) {
      console.log("probleme api pokemon build get from type");
    }
    
    return await response.json();
  } catch (err) {
    console.error("error: ", err);
  } 
}

export {
    getAllPokemon,
    getOnePokemon,
    getAllType,
    getDefensiveCoverage,
    getPokemonsFromGen,
    getPokemonsFromType
};