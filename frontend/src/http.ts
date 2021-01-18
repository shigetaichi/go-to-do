import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3001';

const http = axios.create({
    baseURL: API_HOST,
});

export default http;
