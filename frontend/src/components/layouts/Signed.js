/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/action/authActions";

const SignedIn = props => {
  const { profile } = props;
  return (
    <nav>
      <div className="container">
        <ul className="right" style={{ listStyle: "none" }}>
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Addpost"
              style={{ textDecoration: "none", color: "white" }}
            >
              Addpost
            </Link>
          </li>
          <li>
            <Link
              to="/person"
              style={{ textDecoration: "none", color: "white" }}
            >
              Person Deatils
            </Link>
          </li>
          <li>
            <Link
              to="/addperson"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Person
            </Link>
          </li>
          <li
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            <a onClick={props.signOut}>Signout</a>
          </li>

          <li
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
              textTransform: "uppercase"
            }}
          >
            {profile.initials}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(SignedIn);
