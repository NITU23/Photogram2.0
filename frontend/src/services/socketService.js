import { io } from "socket.io-client";
const socketURL = process.env.REACT_APP_SOCKET
const socket = io(`${socketURL}`);

export default socket;