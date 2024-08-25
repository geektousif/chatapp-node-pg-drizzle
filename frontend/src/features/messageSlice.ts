import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export interface Message {
  id: number;
  chatId: number;
  senderId: number;
  message: string;
  sentAt: string;
}

export interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    // addMessage: (state, action) => {
    //   if (!state.messages) {
    //     state.messages = [];
    //   }
    //   state.messages.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getMessages.matchFulfilled,
      (state, { payload }) => {
        state.messages = payload;
      }
    );
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
