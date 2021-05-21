import React from "react";
import Nav from "./Nav";

const Component = (): React.ReactElement => {
  const [userIdValue, setUserIdValue] = React.useState("1");
  const [isFetching, setIsFetching] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const fetchUserInfo = () => {
    fetch(`https://reqres.in/api/users/${userIdValue}?delay=2`)
      .then((response) =>
        response.status === 200
          ? Promise.resolve(response.json())
          : Promise.reject(response.status)
      )
      .then((data) => {
        setIsSuccessful(true);
        setResult(JSON.stringify(data, undefined, 2));
      })
      .catch((err) => {
        setIsSuccessful(false);
        setErrorMessage(`Request failed. Error: ${err}`);
      })
      .then(() => {
        setIsFetching(false);
      });
  };

  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdValue(event.target.value);
  };

  const onFetchClicked = (event: any) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSuccessful(false);
    setIsFetching(true);
    fetchUserInfo();
  };

  const onReset = (event: any) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSuccessful(false);
    setIsFetching(false);
    setUserIdValue("1");
    setResult("");
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="section">
        <div className="">
          <h1 className="title">useState</h1>
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
                <label className="animated fadeIn is-size-6 has-text-weight-bold">
                  Fetching data. Please wait...
                </label>
              )}

              {isSuccessful && (
                <article className="animated fadeIn message is-success">
                  <div className="message-header">
                    <p>Result</p>
                  </div>
                  <div className="message-body ">
                    <div className="is-family-code">{result}</div>
                  </div>
                </article>
              )}

              {!isSuccessful && errorMessage.length > 0 && (
                <article className="animated fadeIn message is-danger">
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
