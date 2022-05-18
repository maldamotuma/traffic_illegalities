import axios from 'axios';
import url from './baseUrl';

const baxios = axios.create({
    withCredentials: true,
    baseURL: url,
    // headers: { 'Content-Type': 'multipart/form-data' }
});

export default baxios;