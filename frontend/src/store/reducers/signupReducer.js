import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentImg: null,
};

export const signup = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setLogo: (state, action) => {
      state.currentImg = action.payload;
    },
    deleteLogo: (state) => {
      state.currentImg = null;
    },
  },
});

export const { setLogo, deleteLogo } = signup.actions;

export const signupReducer = signup.reducer;
