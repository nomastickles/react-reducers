import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import React from "react";
import useReducerWithDevTools from "../useReducerWithDevTools";
import * as SomeComplexNestedCardState from "./SomeComplexNestedCard/state";
import * as SomeComplexNestedErrorDisplayState from "./SomeComplexNestedErrorDisplay/state";
import * as SomeComplexNestedFormState from "./SomeComplexNestedForm/state";

const rootReducer = combineReducers({
  [SomeComplexNestedFormState.slice.name]:
    SomeComplexNestedFormState.slice.reducer,
  [SomeComplexNestedCardState.slice.name]:
    SomeComplexNestedCardState.slice.reducer,
  [SomeComplexNestedErrorDisplayState.slice.name]:
    SomeComplexNestedErrorDisplayState.slice.reducer,
});

const initialState = {
  [SomeComplexNestedFormState.slice.name]:
    SomeComplexNestedFormState.initialState,
  [SomeComplexNestedCardState.slice.name]:
    SomeComplexNestedCardState.initialState,
  [SomeComplexNestedErrorDisplayState.slice.name]:
    SomeComplexNestedErrorDisplayState.initialState,
};

const initialDispatch: React.Dispatch<AnyAction> = () => {
  return;
};
const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext(initialDispatch);

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props): React.ReactElement => {
  const [state, dispatch] = useReducerWithDevTools(
    rootReducer,
    initialState,
    "useReducer (multiple) + useContext"
  );
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { ContextProvider, StateContext, DispatchContext };
