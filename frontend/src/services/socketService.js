import { io } from "socket.io-client";
const socketURL = process.env.REACT_APP_SOCKET
console.log('er',socketURL)
const socket = io(`${socketURL}`);

export default socket;