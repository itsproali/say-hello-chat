import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  chat: {},
  selectedChatUser: {},
  activeUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, { payload }) => {
      state.chats = payload;
    },

    setChat: (state, { payload }) => {
      state.chat = payload;
    },

    setSelectedChatUser: (state, { payload }) => {
      state.selectedChatUser = payload;
    },

    setActiveUsers: (state, { payload }) => {
      state.activeUsers = payload;
    },

    resetChat: () => initialState,
  },
});

export const {
  setChats,
  setSelectedChatUser,
  setChat,
  setActiveUsers,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
