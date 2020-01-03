import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

const addPerson = gql`
  mutation addPerson(
    $firstname: String!
    $lastname: String!
    $email: String!
    $image: String!
  ) {
    addPerson(
      firstname: $firstname
      lastname: $lastname
      email: $email
      image: $image
    ) {
      id
    }
  }
`;

const getperson = gql`
  {
    person {
      id
      firstname
      lastname
      email
      image
    }
  }
`;
export class AddPerson extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    file: null
  };

  onDrop = e => {
    this.setState({ file: e.target.files[0] });
    console.log({ file: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // console.log(this.state);
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );

    await this.props.addPerson({
      variables: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        image: response.data.url
      },
      refetchQueries: [{ query: getperson }]
    });
    // console.log(this.state);

    this.setState({ firstname: " ", lastname: "", email: " ", file: null });
  };
  render() {
    const { auth } = this.props;
    // console.log(this.props);

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <React.Fragment>
        <div>
          <form id="addPerson" onSubmit={this.handleSubmit}>
            <div>
              <input
                className="field"
                type="text"
                id="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
                placeholder="First name"
              />
            </div>
            <div>
              <input
                className="field"
                type="text"
                id="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                placeholder="Last name"
              />
            </div>
            <div>
              <input
                className="field"
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </div>
            <input type="file" onChange={this.onDrop} />
            <button>Add Person</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);

  return {
    auth: state.firebase.auth
  };
};

export default compose(
  graphql(addPerson, { name: "addPerson" }),
  graphql(getperson, { name: "getperson" }),

  connect(mapStateToProps, null)
)(AddPerson);
