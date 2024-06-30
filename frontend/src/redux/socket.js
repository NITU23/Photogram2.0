import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:5001";
const initialState = {
  socket :''
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state) => {
      const newSocket = io(SOCKET_SERVER_URL);
      state.socket = newSocket
    },
  },
});

export const {setSocket } = socketSlice.actions;
export default socketSlice.reducer;
