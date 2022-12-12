import axios from "axios"
const baseURL = "http://localhost:9000"

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

export {
    login,
    register
}