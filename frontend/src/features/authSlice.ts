import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

interface AuthState {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload: user }) => {
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   apiSlice.endpoints.registerUser.matchFulfilled,
    //   (state, { payload }) => {
    //     state.isAuthenticated = true;
    //     state.user = payload;
    //   }
    // );
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload.data;
        state.isLoading = false;
      }
    );

    builder.addMatcher(apiSlice.endpoints.loginUser.matchRejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    });

    builder.addMatcher(apiSlice.endpoints.loginUser.matchPending, (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(apiSlice.endpoints.getUser.matchPending, (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(
      apiSlice.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload?.data;
        state.isLoading = false;
      }
    );

    builder.addMatcher(apiSlice.endpoints.getUser.matchRejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    });

    builder.addMatcher(
      apiSlice.endpoints.logoutUser.matchFulfilled,
      (state) => {
        state.isAuthenticated = false;
        state.user = null;
      }
    );
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
