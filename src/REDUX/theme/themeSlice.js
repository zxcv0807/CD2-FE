// 라이트모드/다크모드 전환을 관리하는 Redux Slice

import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  mode: localStorage.getItem('theme') || 'light'
};
// Redux Slice 생성
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
