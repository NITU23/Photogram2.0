import { configureStore } from '@reduxjs/toolkit';
import cookieReducer from '../redux/checklogin';

const Store = configureStore({
  reducer: {
    cookie: cookieReducer,
  },
});

export default Store;
