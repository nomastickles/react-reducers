import React from "react";
import { ContextProvider } from "./context";
import SomeComplexNestedForm from "./SomeComplexNestedForm";
import SomeComplexNestedErrorDisplay from "./SomeComplexNestedErrorDisplay";
import SomeComplexNestedCard from "./SomeComplexNestedCard";
import Nav from "../Nav";

const Component = (): React.ReactElement => {
  return (
    <ContextProvider>
      <section className="hero is-primary is-fullheight">
        <div className="section">
          <div className="">
            <h1 className="title">useReducer (multiple) + useContext</h1>
            <div className="columns is-centered">
              <div className="column is-one-quarter">
                <SomeComplexNestedForm />
                <Nav />
              </div>
              <div className="column">
                <SomeComplexNestedErrorDisplay />
                <SomeComplexNestedCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContextProvider>
  );
};
export default Component;
