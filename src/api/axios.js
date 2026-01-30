import axios from 'axios';

const api = axios.create({
    baseURL: 'https://spring-render-rfsd.onrender.com/api',
});

export default api;