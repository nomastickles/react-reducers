import { createAction } from "@reduxjs/toolkit";

export const resetState = createAction(`reset`);
export const fetching = createAction(`fetching`);

export const typing = createAction(`typing`, (payload: string) => ({
  payload,
}));
export const success = createAction(`success`, (payload: string) => ({
  payload,
}));
export const error = createAction(`error`, (payload: string) => ({ payload }));
