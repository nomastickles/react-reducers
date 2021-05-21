import React from "react";
import { Link } from "react-router-dom";

const Component = (): React.ReactElement => {
  return (
    <div className="message-body">
      <div className="has-text-white">
        see console.log <br />
        ctrl+shift+c to clear profile metrics <br />
      </div>
      <br />
      <nav>
        <ul>
          <li>
            <Link to="/1">useState</Link>
          </li>
          <li>
            <Link to="/2">useReducer</Link>
          </li>
          <li>
            <Link to="/3">useReducer + useContext</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Component;
