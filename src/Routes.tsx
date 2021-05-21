import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import UseStateExample from "./UseStateExample";
import UseReducerExample from "./UseReducerExample";
import CombinedReducersAndUseContextExample from "./CombinedReducersAndUseContextExample";

const Component = (): React.ReactElement => {
  return (
    <Switch>
      <Route path="/1">
        <UseStateExample />
      </Route>
      <Route path="/2">
        <UseReducerExample onClick={() => console.log("💥")} />
      </Route>
      <Route path="/3" component={CombinedReducersAndUseContextExample} />

      <Redirect to="/1" />
    </Switch>
  );
};

export default Component;
