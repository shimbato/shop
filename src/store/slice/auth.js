import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    currentUser: null,
    menuOpen: null
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setMenuOpen(state, action) {
      state.menuOpen = action.payload;
    },
    logOut(state) {
      state.token = [];
    }
  }
});

export const {
  setToken,
  setCurrentUser,
  setMenuOpen,
  logOut
} = authSlice.actions;

export const authReducer = authSlice.reducer;
