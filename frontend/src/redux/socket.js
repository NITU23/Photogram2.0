import { createSlice } from '@reduxjs/toolkit';
import socket from '../services/socketService'


const SOCKET_SERVER_URL = "http://localhost:5001";
const initialState = {
  socket :socket
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
  },
 
});

export const {setSocket } = socketSlice.actions;
export default socketSlice.reducer;
