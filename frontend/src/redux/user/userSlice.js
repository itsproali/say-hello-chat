import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  name: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state._id = payload._id;
      state.email = payload.email;
      state.name = payload.name;
      state.avatar = payload.avatar;
    },

    logout: () => initialState,

    updateAvatarUrl: (state, { payload }) => {
      state.avatar = payload;
    },
  },
});

export const { setUser, logout, updateAvatarUrl } = userSlice.actions;
export default userSlice.reducer;
