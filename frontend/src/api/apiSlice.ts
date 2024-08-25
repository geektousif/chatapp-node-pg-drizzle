import { current } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

// import { RootState } from "../app/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/api`,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.user?.token;

    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  tagTypes: ["users", "chats", "messages"],
  // User endpoints
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (creds) => ({
        url: "/user/login",
        method: "POST",
        body: creds,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query<unknown, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

    // searchUsers: builder.query({
    //   query: (query) => `/user/search?username=${query}`,
    //   transformResponse: (response: any) => response.data,
    // }),

    // chat endpoints
    getChats: builder.query<any, void>({
      query: () => `/chat`,
      transformResponse: (response: any) => response.data,
    }),

    searchChats: builder.query({
      query: (query) => `/chat/search?username=${query}`,
      transformResponse: (response: any) => response.data,
    }),

    initiateChat: builder.mutation({
      query: (data) => ({
        url: "/chat/initiate",
        method: "POST",
        body: data,
      }),
    }),

    getMessages: builder.query({
      query: ({ chatId, page, limit }) =>
        `/chat/${chatId}?page=${page}&limit=${limit}`,
      transformResponse: (response: any) => response.data,

      // providesTags(result, error, arg, meta) {
      //   return [{ type: "messages", id: arg.chatId }];
      // },
      async onCacheEntryAdded(arg, lifeCycleApi) {
        try {
          await lifeCycleApi.cacheDataLoaded;

          const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
            withCredentials: true,
            transports: ["websocket"],
          });

          socket.emit("join_chat", arg.chatId);

          socket.on("receive_message", (data) => {
            lifeCycleApi.updateCachedData((draft) => {
              draft.push(data);
            });
          });

          await lifeCycleApi.cacheEntryRemoved;
          socket.off("receive_message");
        } catch {
          /* empty */
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,

  // useSearchUsersQuery,
  useSearchChatsQuery,
  useGetChatsQuery,
  useInitiateChatMutation,
  useGetMessagesQuery, // TODO think of  lazy
} = apiSlice;
