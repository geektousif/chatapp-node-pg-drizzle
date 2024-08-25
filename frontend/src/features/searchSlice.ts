import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    // isLoading: false,
    searchQuery: "",
    searchResults: [],
  },
  reducers: {
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(apiSlice.endpoints.searchChats.matchPending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addMatcher(
      apiSlice.endpoints.searchChats.matchFulfilled,
      (state, { payload }) => {
        state.searchResults = payload.data;
        // state.isLoading = false;
      }
    );
  },
});

export const { clearSearch, setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
