import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "./store/action/authActions";
export class Signup extends Component {
  state = {
    email: " ",
    password: " ",
    firstname: "",
    lastname: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.signup(this.state);
  };
  render() {
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="fields">
            {"  "}
            <input
              type="text"
              id="firstname"
              className="field"
              placeholder="firstname"
              onChange={this.handleChange}
            />
          </div>
          <div className="fields">
            <input
              type="text"
              id="lastname"
              className="field"
              placeholder="Lastname"
              onChange={this.handleChange}
            />
          </div>
          <div className="fields">
            <input
              type="text"
              id="email"
              className="field"
              placeholder="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="fields">
            <input
              type="password"
              className="field"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
            />
          </div>
          <button>SignUp</button>
          <p style={{ color: "red" }}>{authError} </p>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: newUser => dispatch(signUp(newUser))
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
