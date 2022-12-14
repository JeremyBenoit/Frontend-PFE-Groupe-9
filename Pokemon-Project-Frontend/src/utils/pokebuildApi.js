import axios from "axios"
const baseURL = "https://pokebuildapi.fr/api/v1/pokemon/"
async function getAllPokemons() {
    const res = await axios.get(baseURL).catch(err => {
            console.error("error: ", err);
            return []
    })
    return res.data
}


export {
    getAllPokemons
};