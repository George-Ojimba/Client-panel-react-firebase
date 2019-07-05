import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-4">
        <span className="text-danger ">404</span> Page Not Found
      </h1>
      <p className="lead">
        Sorry, that page does not exist <span className="display-3">:(</span>
      </p>

      <Link to="/" className="btn btn-link ">
        <i className="fas fa-arrow-circle-left" />
        {" "}Go To Homepage
      </Link>
    </div>
  );
};
