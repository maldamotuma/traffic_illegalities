import { io } from "socket.io-client";

const location_search_Socket = io(process.env.REACT_APP_SERVER + "/location-search");

export default location_search_Socket;