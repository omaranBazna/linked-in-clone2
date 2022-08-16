import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  userPhoto: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInA: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPhoto = action.payload.userPhoto;
    },
    signOutA: (state, action) => {
      state.userName = "";
      state.userEmail = "";
      state.userPhoto = "";
    },
  },
});
export const { signInA, signOutA } = userSlice.actions;
export const userReducer = userSlice.reducer;
