import axios from 'axios';
import url from './baseUrl';

const baxios = axios.create({
    withCredentials: true,
    baseURL: url,
});

export default baxios;