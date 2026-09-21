import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false, // CHANGE 1
    error: null,
  },

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },

    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;

      state.chats[chatId].messages.push({ content, role });
    },

    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;

      state.chats[chatId].messages.push(...messages);
    },

    setChat: (state, action) => {
      state.user = action.payload;
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload; // CHANGE 2
    },

    setError: (state, action) => {
      state.error = action.payload; // CHANGE 3
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
