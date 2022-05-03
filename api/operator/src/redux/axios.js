import axios from "axios";

const CAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}/operator`,
    withCredentials: true
});

export default CAxios;