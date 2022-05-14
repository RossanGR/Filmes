import axios from "axios";
// base api https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/movie/550?api_key=918084ec9b2a0c77ebb1c9e8ae11acc4


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;