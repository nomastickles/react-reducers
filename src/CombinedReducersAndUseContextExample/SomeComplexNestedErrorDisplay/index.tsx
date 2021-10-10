import React from "react";
import * as actions from "../actions";
import { DispatchContext, StateContext } from "../context";

const ErrorDisplay = () => {
  const dispatch = React.useContext(DispatchContext);
  const {
    someComplexErrorState: { message },
    someComplexFormState: { userIdValue },
  } = React.useContext(StateContext);

  if (!message) {
    return null;
  }

  return (
    <article className="message is-info animated fadeIn">
      <div className="message-header">
        <p>Error</p>
      </div>
      <div className="message-body has-text-centered">
        <div className="columns">
          <div className="column">
            <div className="is-family-code">
              {message} using ID <strong>{userIdValue}</strong>{" "}
            </div>
          </div>
          <div className="column">
            <button
              className="button"
              onClick={() => dispatch(actions.resetState())}
            >
              Reset all the things you messed up :(
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ErrorDisplay;
