import { io } from "socket.io-client";

const user_traffic_socket = io("http://localhost:5000/userTraffic");

export default user_traffic_socket;