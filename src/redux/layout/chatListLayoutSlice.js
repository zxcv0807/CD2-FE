// 채팅 페이지에서 사이드바의 채팅 목록 표시 여부를 관리하는 Redux Slice

import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  isChatListVisible: true,
};
// Redux Slice 생성
const chatListLayoutSlice = createSlice({
  name: "chatListLayout",
  initialState,
  reducers: {
    toggleChatListVisible(state) {
      state.isChatListVisible = !state.isChatListVisible;
    },
    showChatList(state) {
      state.isChatListVisible = true;
    },
    hideChatList(state) {
      state.isChatListVisible = false;
    },
  },
});

export const { toggleChatListVisible, showChatList, hideChatList } = chatListLayoutSlice.actions;
export default chatListLayoutSlice.reducer;
