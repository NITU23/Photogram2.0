import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'

const initialState = {
  cookieExists: false,
  username:''
};

const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    checkCookie: (state) => {
      const cookie = Cookies.get('token');
      state.username = jwtDecode(cookie)
      state.cookieExists = cookie !== undefined;
    },
  },
});

export const { checkCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
