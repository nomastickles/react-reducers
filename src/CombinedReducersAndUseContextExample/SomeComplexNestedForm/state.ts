import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export interface FormState {
  userIdValue: string;
  isFetching: boolean;
}

export const initialState: FormState = {
  userIdValue: "1",
  isFetching: false,
};

export const slice = createSlice({
  name: "someComplexFormState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.resetState, (state) => {
      Object.assign(state, initialState);
    });
    builder.addCase(actions.typing, (state, { payload }) => {
      // example of complexity which is easy to unit test
      // maybe 0 is forbidden for some reason?
      if (payload !== "0") {
        state.userIdValue = payload;
      }
    });
    builder.addCase(actions.fetching, (state) => {
      state.isFetching = true;
    });
    builder.addCase(actions.success, (state) => {
      state.isFetching = false;
    });
    builder.addCase(actions.error, (state) => {
      state.isFetching = false;
    });
  },
});
