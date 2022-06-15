import { io } from "socket.io-client";

const user_traffic_socket = io(process.env.REACT_APP_SERVER + "/userTraffic");

export default user_traffic_socket;