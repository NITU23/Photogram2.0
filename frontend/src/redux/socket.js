import { createSlice } from '@reduxjs/toolkit';
import socket from '../services/socketService'


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
