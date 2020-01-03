import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "./store/action/authActions";
import { Redirect } from "react-router-dom";
export class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="fields">
            <input
              type="text"
              className="field"
              id="email"
              placeholder="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="fields">
            <input
              type="password"
              id="password"
              className="field"
              placeholder="password"
              onChange={this.handleChange}
            />
          </div>
          <button>Signin</button>
          <p style={{ color: "red" }}>{authError} </p>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  //console.log(state);

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credential => dispatch(signIn(credential))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Signin);
