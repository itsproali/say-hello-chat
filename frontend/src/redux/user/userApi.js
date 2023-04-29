import apiBase from "../apiBase";
import { setUser, updateAvatarUrl } from "./userSlice";

const userApi = apiBase.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (cred) => ({
        url: "/user/create",
        method: "POST",
        body: cred,
      }),

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     console.log("Requesting");
      //     const { data } = await queryFulfilled;
      //     dispatch(setUser(data?.data));
      //   } catch (err) {
      //     console.log("Something went wrong");
      //   }
      // },
    }),

    loginUser: builder.mutation({
      query: (cred) => ({
        url: "/user/login",
        method: "POST",
        body: cred,
      }),

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     console.log("Requesting");
      //     const { data } = await queryFulfilled;
      //     dispatch(setUser(data?.data));
      //   } catch (err) {
      //     console.log("Something went wrong");
      //   }
      // },
    }),

    getUserInfo: builder.query({
      query: (userId) => ({
        url: `/user/info/${userId}`,
        method: "GET",
      }),
    }),

    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `/user/update/avatar`,
        method: "PUT",
        body: data,
      }),

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     console.log("Updating avatar");
      //     const { data } = await queryFulfilled;
      //     dispatch(updateAvatarUrl(data?.data));
      //   } catch (err) {
      //     console.log("Something went wrong");
      //   }
      // },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserInfoQuery,
  useUpdateAvatarMutation,
} = userApi;
