import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import * as actions from "../actions";
import { DispatchContext, StateContext } from "../context";
import { FormState } from "./state";

const fetchUserInfo = (
  userIdValue: string,
  dispatch: React.Dispatch<AnyAction>
) => {
  dispatch({ type: "fetching" });
  fetch(`https://reqres.in/api/users/${userIdValue}?delay=2`)
    .then((response) =>
      response.status === 200
        ? Promise.resolve(response.json())
        : Promise.reject(response.status)
    )
    .then((data) => {
      dispatch(actions.success(JSON.stringify(data, undefined, 2)));
    })
    .catch((err) => {
      dispatch(actions.error(err));
    });
};

// using react memo since we're not using something like redux's useSelector
// potentially over kill :) read this to get a better perspective on memoizing in react  ->
//  https://kentcdodds.com/blog/usememo-and-usecallback
const Form = React.memo(
  (props: FormState): React.ReactElement => {
    const dispatch = React.useContext(DispatchContext);

    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.typing(event.target.value));
    };

    const onFetchClicked = (event: any) => {
      event.preventDefault();
      fetchUserInfo(props.userIdValue, dispatch);
    };

    const onReset = (event: any) => {
      event.preventDefault();
      dispatch(actions.resetState());
    };

    return (
      <form className="box animated fadeIn" noValidate autoComplete="off">
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
              value={props.userIdValue}
              disabled={props.isFetching}
            />
          </div>
        </div>

        <div className="field">
          <button
            className="button is-success"
            type="submit"
            value="Fetch"
            onClick={onFetchClicked}
            disabled={props.isFetching}
          >
            Fetch
          </button>

          <button
            className="button pull-right"
            disabled={props.isFetching}
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </form>
    );
  }
);

// this kinda acts like the old redux mapDispatchToProps
const FormContainer = (): React.ReactElement => {
  const { someComplexFormState } = React.useContext(StateContext);
  return <Form {...someComplexFormState} />;
};

export default FormContainer;
