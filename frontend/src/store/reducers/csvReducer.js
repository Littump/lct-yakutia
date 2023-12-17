import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesCSV: null,
  employeesCSV: null,
};

export const csv = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setEmployeesCSV: (state, action) => {
      state.employeesCSV = action.payload;
    },
    setMessagesCSV: (state, action) => {
      state.messagesCSV = action.payload;
    },
  },
});

export const { setEmployeesCSV, setMessagesCSV } = csv.actions;

export const csvReducer = csv.reducer;
