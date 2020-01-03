import React from "react";
import { Link } from "react-router-dom";

const SignedOut = () => {
  return (
    <nav>
      <div>
        <ul className="right" style={{ listStyle: "none" }}>
          <li>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "white" }}
            >
              Signin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SignedOut;
