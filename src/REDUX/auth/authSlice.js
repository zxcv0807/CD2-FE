import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
};

// localStorage에서 초기값 불러오기
const savedToken = localStorage.getItem("token");

if (savedToken) {
    initialState.isLoggedIn = true;
    initialState.token = savedToken;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;

            // localStorage에 저장
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;

            // localStorage에서 제거
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
