import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  initiateChatLoading: false,
  chats: [],
  selectedChat: {
    chatId: null,
    username: null,
    userId: null,
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getChats.matchFulfilled,
      (state, { payload }) => {
        state.chats = payload;
      }
    );

    builder.addMatcher(
      apiSlice.endpoints.initiateChat.matchFulfilled,
      (state, { payload }) => {
        const data = {
          chatId: payload.data.chatId,
          friend: {
            id: payload.data.userId,
          },
        };
        state.chats.push(data);

        state.selectedChat = payload.data;
        state.initiateChatLoading = false;
      }
    );

    builder.addMatcher(
      apiSlice.endpoints.initiateChat.matchPending,
      (state) => {
        state.initiateChatLoading = true;
      }
    );
  },
});

export const { selectChat } = chatSlice.actions;

export default chatSlice.reducer;
