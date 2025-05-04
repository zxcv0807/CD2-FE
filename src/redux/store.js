import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatListLayoutReducer from "./layout/chatListLayoutSlice";
import themeReducer from "./theme/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chatListLayout: chatListLayoutReducer, 
    theme: themeReducer,
  },
});

export default store;
