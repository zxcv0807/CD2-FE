// 로그인 상태를 관리하는 Redux Slice

import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
};

// localStorage에서 초기값 불러오기
const savedToken = localStorage.getItem("token");
const savedUserId = localStorage.getItem("userId");

// localStorage에 저장된 값이 있다면 초기 상태 업데이트
if (savedToken && savedUserId) {
    initialState.isLoggedIn = true;
    initialState.token = savedToken;
    initialState.userId = savedUserId;
}
// Redux Slice 생성
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;

            // localStorage에 저장
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("userId", action.payload.userId);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;

            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
