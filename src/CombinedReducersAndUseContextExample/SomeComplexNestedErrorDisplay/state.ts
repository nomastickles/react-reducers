import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export interface ErrorState {
  message?: string;
}

export const initialState: ErrorState = {
  message: undefined,
};

export const slice = createSlice({
  name: "someComplexErrorState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.resetState, (state) => {
      Object.assign(state, initialState);
    });
    builder.addCase(actions.success, (state) => {
      state.message = undefined;
    });
    builder.addCase(actions.error, (state, { payload }) => {
      state.message = payload;
    });
  },
});
