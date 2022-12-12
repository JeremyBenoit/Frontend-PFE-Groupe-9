async function getAllPokemon() {
    try {
        const option = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon")
        if(!response.ok) return "probleme api pokemon build get all pokemons"
        return response.json();
    } catch (err) {
        console.error("error: ", err);
    }
}

export {
    getAllPokemon,
};