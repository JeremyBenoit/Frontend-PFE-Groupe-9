import axios from "axios";
const baseURL = "http://localhost:9000";

const login = async (pseudo, password) => {
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

const register = async (pseudo, password) => {
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

const getAllLikedByUserId = async (token, pseudo) => {
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
const getAllByAuthorId = async  (token, pseudo) => {
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

const getAllCollection = async (id, token) => {
    try {
        let res = await axios.get(baseURL.concat(`/collections/user/${id}`),{
            headers: {
                'Authorization': token
            }
        })
        return res.data
    } catch (e){
        return null
    }
}

const addPokemonToCollection = async (userId, pokemonId, token) => {
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

export {
    login,
    register,
    getAllLikedByUserId,
    getAllByAuthorId,
    getAllCollection,
    addPokemonToCollection
}