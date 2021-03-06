import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import * as actions from "../actions";
import { DispatchContext, StateContext } from "../context";
import { FormState } from "./state";

const fetchUserInfo = async (
  dispatch: React.Dispatch<AnyAction>,
  userIdValue: string
) => {
  dispatch({ type: "fetching" });

  try {
    const response = await fetch(
      `https://reqres.in/api/users/${userIdValue}?delay=2`
    );

    if (response.status !== 200) {
      throw new Error(`status ${response.status}`);
    }

    const data = await response.json();
    dispatch(actions.success(JSON.stringify(data, undefined, 2)));
  } catch (err) {
    dispatch(actions.error(err as any));
  }
};

// using react memo since we're not using something like redux's useSelector
// potentially over kill :) read this to get a better perspective on memoizing in react  ->
//  https://kentcdodds.com/blog/usememo-and-usecallback
const Form = React.memo((props: FormState): React.ReactElement => {
  const dispatch = React.useContext(DispatchContext);

  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.typing(event.target.value));
  };

  const onFetchClicked = (event: any) => {
    event.preventDefault();
    fetchUserInfo(dispatch, props.userIdValue);
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
});

// this kinda acts like the old redux mapDispatchToProps
const FormContainer = (): React.ReactElement => {
  const { someComplexFormState } = React.useContext(StateContext);
  return <Form {...someComplexFormState} />;
};

export default FormContainer;
