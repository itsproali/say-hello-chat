import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  chat: {},
  selectedChatUser: {},
  activeUsers: [],
  messages: [],
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

    setMessages: (state, { payload }) => {
      state.messages = payload;
    },

    addMessage: (state, { payload }) => {
      if (state.messages.find((m) => m._id === payload._id)) return;

      state.messages.push(payload);
    },

    resetChat: () => initialState,
  },
});

export const {
  setChats,
  setSelectedChatUser,
  setChat,
  setActiveUsers,
  setMessages,
  addMessage,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
