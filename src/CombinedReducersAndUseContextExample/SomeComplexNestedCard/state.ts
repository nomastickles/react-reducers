import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export interface CardState {
  name?: string;
  description?: string;
  imgLink?: string;
  email?: string;
  /**
   * maybe this component needs to have an
   * additional loading prop for some reason
   */
  isFetchingLocal: boolean;
}

export const initialState: CardState = {
  name: undefined,
  description: undefined,
  imgLink: undefined,
  email: undefined,
  isFetchingLocal: false,
};

export const slice = createSlice({
  name: "someComplexCardState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.resetState, (state) => {
      Object.assign(state, initialState);
    });
    builder.addCase(actions.fetching, (state) => {
      Object.assign(state, initialState);
      state.isFetchingLocal = true;
    });
    builder.addCase(actions.success, (state, { payload }) => {
      state.isFetchingLocal = false;

      const incomingData = JSON.parse(payload);
      state.imgLink = incomingData.data?.avatar;
      state.email = incomingData.data?.email;
      state.name = `${incomingData.data?.first_name} ${incomingData.data?.last_name}`;
    });
    builder.addCase(actions.error, (state) => {
      state.isFetchingLocal = false;
    });
  },
});
