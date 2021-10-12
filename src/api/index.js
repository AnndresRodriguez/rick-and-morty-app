import axios from "axios";

// Configuracion inicial AXIOS

export default axios.create({
  baseURL: `https://rickandmortyapi.com/api/`,
});
