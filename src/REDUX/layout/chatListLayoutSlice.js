import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatListVisible: true,
};

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
