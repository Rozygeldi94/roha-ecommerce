import { createSlice } from "@reduxjs/toolkit";
const initialState = { user: null, users: null };

const databaseUser_slice = createSlice({
  name: "databaseUserSlice",
  initialState,
  reducers: {
    setDatabaseUser: (state, { payload }) => {
      if (payload) state.user = payload;
    },
    setDatabaseUsers: (state, { payload }) => {
      if (payload) state.users = payload;
    },
  },
});
export const { actions, reducer } = databaseUser_slice;
