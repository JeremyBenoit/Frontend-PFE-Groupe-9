async function getTeam() {
  try {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }

    const response = await fetch("http://localhost:9000/teams/")
    if(!response.ok) return "probleme get team pokemons"
    console.log("test")
    return response.json();
  } catch (err) {
    console.error("error: ", err);
  }
}
export {getTeam}