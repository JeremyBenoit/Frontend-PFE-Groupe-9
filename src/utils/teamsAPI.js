import axios from "axios"
const baseURL = "http://localhost:9000"

async function getOneTeamById(id) {
  try {
    const response = await axios.get(baseURL.concat('/teams/one/'+id))
    return response.data;
  } catch (err) {
    console.error("error: ", err);
  }
}
async function getOneTeamByName(name) {
  try {
    const response = await axios.get(baseURL.concat('/teams/'+name))
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
export {getOneTeamById, getAllTeam, getOneTeamByName}