import React from "react";
import Signed from "./Signed";
import SignedOut from "./SignedOut";

import { connect } from "react-redux";
const Nav = props => {
  const { auth } = props;
  const links = auth.uid ? <Signed /> : <SignedOut />;

  return (
    <div>
      <nav className="nav-wrapper yellow darken-3">
        <div className="container">{links}</div>
      </nav>
    </div>
  );
};

const mapstateToProps = state => {
  //console.log(state);

  return {
    auth: state.firebase.auth
  };
};
export default connect(mapstateToProps)(Nav);
