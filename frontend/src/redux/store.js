import { configureStore } from '@reduxjs/toolkit';
import cookieReducer from '../redux/checklogin';
import socketReducer from '../redux/socket'


const Store = configureStore({
  reducer: {
    cookie: cookieReducer,
    socket : socketReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( {serializableCheck:false}),
});

export default Store;
