import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  cookieExists: false,
};

const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    checkCookie: (state) => {
      const cookie = Cookies.get('token');
      state.cookieExists = cookie !== undefined;
    },
  },
});

export const { checkCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
