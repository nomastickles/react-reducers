import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import Nav from "./Nav";

interface State {
  isFetching: boolean;
  isSuccessful: boolean;
  errorMessage: string;
  result: string;
  userIdValue: string;
}

const initialState: State = {
  isFetching: false,
  isSuccessful: false,
  errorMessage: "",
  result: "",
  userIdValue: "1",
};

export const slice = createSlice({
  name: "someComplexFormState",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    fetching: (state) => {
      state.isFetching = true;
      state.isSuccessful = false;
      state.errorMessage = "";
      state.result = "";
    },
    typing: (state, { payload }: PayloadAction<string>) => {
      state.userIdValue = payload;
    },
    success: (state, { payload }: PayloadAction<string>) => {
      state.result = payload;
      state.isFetching = false;
      state.isSuccessful = true;
      state.result = payload;
    },
    error: (state, { payload }: PayloadAction<string>) => {
      state.isFetching = false;
      state.errorMessage = `Request failed. Error: ${payload}`;
    },
  },
});

const Component = ({
  onClick,
}: {
  onClick: () => void;
}): React.ReactElement => {
  const [
    { isSuccessful, isFetching, userIdValue, errorMessage, result },
    dispatch,
  ] = React.useReducer(slice.reducer, initialState);

  const fetchUserInfo = () => {
    dispatch(slice.actions.fetching());
    fetch(`https://reqres.in/api/users/${userIdValue}?delay=2`)
      .then((response) =>
        response.status === 200
          ? Promise.resolve(response.json())
          : Promise.reject(response.status)
      )
      .then((data) => {
        dispatch(slice.actions.success(JSON.stringify(data, undefined, 2)));
      })
      .catch((err) => {
        dispatch(slice.actions.error(err));
      });
  };

  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(slice.actions.typing(event.target.value));
  };

  const onFetchClicked = (event: any) => {
    event.preventDefault();
    fetchUserInfo();
  };

  const onReset = (event: any) => {
    event.preventDefault();
    dispatch(slice.actions.reset());
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="section">
        <div className="">
          <h1 className="title" onClick={onClick}>
            useReducer
          </h1>
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <form
                className="box animated fadeIn"
                noValidate
                autoComplete="off"
              >
                <div className="field">
                  <label htmlFor="" className="label">
                    Enter User ID (1-12)
                  </label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      id="userId"
                      name="userId"
                      required
                      onChange={onValueChanged}
                      value={userIdValue}
                      disabled={isFetching}
                    />
                  </div>
                </div>

                <div className="field">
                  <button
                    className="button is-success"
                    type="submit"
                    value="Fetch"
                    onClick={onFetchClicked}
                    disabled={isFetching}
                  >
                    Fetch
                  </button>

                  <button
                    className="button pull-right"
                    disabled={isFetching}
                    onClick={onReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
              <Nav />
            </div>
            <div className="column">
              {isFetching && (
                <label className="is-size-6 has-text-weight-bold animated fadeIn">
                  Fetching data. Please wait...
                </label>
              )}

              {isSuccessful && (
                <article className="message is-success animated fadeIn">
                  <div className="message-header">
                    <p>Result</p>
                  </div>
                  <div className="message-body ">
                    <div className="is-family-code">{result}</div>
                  </div>
                </article>
              )}

              {!isSuccessful && errorMessage.length > 0 && (
                <article className="message is-danger animated fadeIn">
                  <div className="message-header">
                    <p>Error</p>
                  </div>
                  <div className="message-body">
                    <div className="is-family-code">{errorMessage}</div>
                  </div>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Component;
