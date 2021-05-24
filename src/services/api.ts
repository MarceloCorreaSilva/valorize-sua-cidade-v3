import axios from "axios";

const api = axios.create({
  baseURL: "http://figueirao.valorize.pivovar.com.br/api/",
  // baseURL: "http://api.valorize.pivovar.com.br/api/",
  // baseURL: "https://valorize-sua-cidade.herokuapp.com",
  // baseURL: "http://localhost:3333/",
});

export default api;
