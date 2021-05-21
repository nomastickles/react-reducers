import React from "react";
import { StateContext } from "../context";
import { CardState } from "./state";

// using react memo since we're not using something like redux's useSelector
// potentially over kill :)
const Card = React.memo((props: CardState) => {
  if (props.isFetchingLocal) {
    return (
      <label className="animated fadeIn is-size-6 has-text-weight-bold">
        Fetching data. Please wait ...
      </label>
    );
  }
  if (!props.name) {
    return null;
  }

  return (
    <div className="card animated fadeIn" style={{ maxWidth: "400px" }}>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={props.imgLink} alt="Placeholder image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4 has-text-black">{props.name}</p>
            <p className="subtitle is-6 has-text-black">{props.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

// this kinda acts like the old redux mapDispatchToProps
const CardContainer = (): React.ReactElement => {
  const { someComplexCardState } = React.useContext(StateContext);

  return <Card {...someComplexCardState} />;
};

export default CardContainer;
