import axios from "axios";
const baseURL = "http://localhost:9000";

async function login (pseudo, password) {
    try {
        const res = await axios.post(baseURL.concat("/connect"), {
            pseudo: pseudo,
            password: password
        })
        return res.data
    } catch (e){
        return e.response.status
    }

}

async function register (pseudo, password) {
    try {
        const res = await axios.post(baseURL.concat("/register"), {
            pseudo: pseudo,
            password: password
        })
        return res.data
    } catch (e){
        return e.response.status
    }
}

async function getAllLikedByUserId (token, pseudo) {
    try {
        const res = await axios.get(baseURL.concat(`/teams/likes/users/${pseudo}`),{
            headers: {
                'Authorization': token
            }
        })
        return res.data
    } catch (e){
        return e.response.status
    }
}
async function getAllByAuthorId(token, pseudo) {
    try {
        const res = await axios.get(baseURL.concat(`/teams/authors/${pseudo}`),{
            headers: {
                'Authorization': token
            }
        })
        return res.data
    } catch (e){
        return e.response.status
    }
}

async function getAllCollection(id, token) {
    try {
        let res = await axios.get(baseURL.concat(`/collections/users/${id}`),{
            headers: {
                'Authorization': token
            }
        })
        return res.data
    } catch (e){
        return null
    }
}

async function addPokemonToCollection(userId, pokemonId, token) {
    try {
        let res = await axios.post(baseURL.concat(`/collections/`),
        {
            pokemonId: pokemonId,
            userId: userId
        },{
                headers: {
                    'Authorization': token
                }
            })
        return res.data
    } catch (e){
        return null
    }
}

async function getOneTeamById(id) {
    try {
        const response = await axios.get(baseURL.concat(`/teams/${id}`))
        return response.data;
    } catch (err) {
        console.error("error: ", err);
    }
}

async function getAllTeam() {
    try {
        const response = await axios.get(baseURL.concat('/teams/'))
        return response.data;
    } catch (err) {
        console.error("error: ", err);
    }
}

export {
    login,
    register,
    getAllLikedByUserId,
    getAllByAuthorId,
    getAllCollection,
    addPokemonToCollection,
    getOneTeamById,
    getAllTeam,
}