import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatListLayoutReducer from "./layout/chatListLayoutSlice";
import themeReducer from "./theme/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // 로그인 상태 관리
    chatListLayout: chatListLayoutReducer, // 사이드바의 열림/숨김 상태 관리
    theme: themeReducer, // 라이트모드/다크모드 전환 관리
  },
});

export default store;
