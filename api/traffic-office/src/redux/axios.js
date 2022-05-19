import axios from "axios";

const CAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}/traffic-office`,
    withCredentials: true
});

export default CAxios;