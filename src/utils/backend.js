import axios from "axios";
const baseURL = "http://localhost:9000";

const login = async (pseudo, password) => {
    try {
        let res = await axios.post(baseURL.concat("/connect"), {
            pseudo: pseudo,
            password: password
        })
        return res.data
    } catch (e){
        return null
    }

}

const register = async (pseudo, password) => {
    try {
        let res = await axios.post(baseURL.concat("/register"), {
            pseudo: pseudo,
            password: password
        })
        return res.data
    } catch (e){
        return null
    }
}

const getAllLikedByUserId = async (token, pseudo) => {
    try {
        let res = await axios.get(baseURL.concat(`/teams/likes/users/${pseudo}`),{
            headers: {
                'Authorization': token
            }
        })
        return res.data
    } catch (e){
        return null
    }
}
const getAllByAuthorId = async  (token, pseudo) => {
    try {
        let res = await axios.get(baseURL.concat(`/teams/authors/${pseudo}`),{
            headers: {
                'Authorization': token
            }
        })
        return res.data
    } catch (e){
        return null
    }
}

const getAllCollection = async (id) => {
    try {
        let res = await axios.get(baseURL.concat(`/collection/user/${id}`))
        return res.data
    } catch (e){
        return null
    }
}

const addPokemonToCollection = async (userId, pokemonId) => {
    try {
        let res = await axios.post(baseURL.concat(`/collection/`),
        {
            pokemonId: pokemonId,
            userId: userId
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