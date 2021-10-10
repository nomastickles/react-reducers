import { AnyAction } from "@reduxjs/toolkit";
import { Reducer, useEffect, useMemo, useReducer } from "react";

let stores: Record<any, any> = {};
let subscribers: Record<string, any> = {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const REDUX_DEVTOOL_SET_STATE = "REDUX_DEVTOOL_SET_STATE";
const withDevTools = (name: string) => {
  return name && !!window?.__REDUX_DEVTOOLS_EXTENSION__;
};

const devToolReducer =
  (reducer: Reducer<any, AnyAction>) =>
  (state: Record<any, any>, action: AnyAction) => {
    if (action.type === REDUX_DEVTOOL_SET_STATE) {
      return action.state;
    } else {
      return reducer(state, action);
    }
  };

function useReducerWithDevTools(
  reducer: Reducer<any, AnyAction>,
  initialState: Record<any, any>,
  name: string
) {
  const shouldConfigDevTools = withDevTools(name);
  const memoizedReducer = useMemo(
    () => (shouldConfigDevTools ? devToolReducer(reducer) : reducer),
    [reducer, shouldConfigDevTools]
  );

  const [state, dispatch] = useReducer(memoizedReducer, initialState);

  useEffect(() => {
    if (!shouldConfigDevTools) {
      return;
    }

    if (stores[name]) {
      throw new Error("More than one useReducerWithDevTools have same name");
    }

    stores[name] = window.__REDUX_DEVTOOLS_EXTENSION__(reducer, initialState, {
      name,
    });

    subscribers[name] = stores[name].subscribe(() => {
      dispatch({
        type: REDUX_DEVTOOL_SET_STATE,
        state: stores[name].getState(),
      });
    });

    return () => {
      if (shouldConfigDevTools) {
        subscribers[name]();
        subscribers[name] = undefined;
        stores[name] = undefined;
      }
    };
  }, [initialState, name, reducer, shouldConfigDevTools]);

  const customDispatch = (action: AnyAction) => {
    if (shouldConfigDevTools && stores[name]) {
      stores[name].dispatch(action);
    } else {
      dispatch(action);
    }
  };

  return [state, customDispatch];
}

export default useReducerWithDevTools;
