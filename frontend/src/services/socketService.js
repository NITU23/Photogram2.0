import { io } from "socket.io-client";
const socketURL = 'https://photogram2-0-socket.vercel.app/'
const socket = io(`${socketURL}`);

export default socket;