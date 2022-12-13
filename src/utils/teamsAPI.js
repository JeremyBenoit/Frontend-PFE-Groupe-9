import axios from "axios"
const baseURL = "http://localhost:9000"

async function getTeam() {
  try {
    const response = await axios.get(baseURL.concat('/teams/'))
    console.log("test")
    return response.data;
  } catch (err) {
    console.error("error: ", err);
  }
}
export {getTeam}