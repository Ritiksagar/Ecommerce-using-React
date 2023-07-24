import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound">
      <div className="text-center">
        <h1>404</h1>
        <span>
          <Link to="/">Back To Home</Link>
        </span>
      </div>
    </div>
  );
}

export default NotFound;
