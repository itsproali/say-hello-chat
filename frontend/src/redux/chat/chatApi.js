import apiBase from "../apiBase";

const chatApi = apiBase.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (body) => ({
        url: "/chat/create",
        method: "POST",
        body,
      }),
    }),

    getUserChats: builder.query({
      query: (userId) => ({ url: `/chat/get/${userId}`, method: "GET" }),
    }),

    getChat: builder.query({
      query: (firstId, secondId) => ({
        url: `/chat/get-chat/${firstId}/${secondId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateChatMutation, useGetUserChatsQuery, useGetChatQuery } =
  chatApi;
