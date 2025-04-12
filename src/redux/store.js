import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatListLayoutReducer from "./layout/chatListLayoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chatListLayout: chatListLayoutReducer, 
  },
});

export default store;
