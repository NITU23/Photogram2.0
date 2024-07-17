import { io } from "socket.io-client";
const socketURL = 'https://main--photogramsocket.netlify.app/'
const socket = io(`${socketURL}`);

export default socket;