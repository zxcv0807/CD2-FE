import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
};

// localStorage에서 초기값 불러오기
const savedToken = localStorage.getItem("token");
const savedUserId = localStorage.getItem("userId");

if (savedToken && savedUserId) {
    initialState.isLoggedIn = true;
    initialState.token = savedToken;
    initialState.userId = savedUserId;
}

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

            // localStorage에서 제거
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
