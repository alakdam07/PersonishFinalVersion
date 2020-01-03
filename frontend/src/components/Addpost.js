import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getPost } from "./Post";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const getPerson = gql`
  {
    person {
      id
      firstname
      lastname
      email
    }
  }
`;

const addPostMutation = gql`
  mutation Addpost($title: String!, $content: String!, $personid: ID!) {
    addpost(title: $title, content: $content, personid: $personid) {
      title
      id
    }
  }
`;

export class Addpost extends Component {
  state = {
    title: " ",
    content: " ",
    personid: " "
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.addPostMutation({
      variables: {
        title: this.state.title,
        content: this.state.content,
        personid: this.state.personid
      },
      refetchQueries: [{ query: getPost }]
    });
    this.setState({ title: "", content: "", personid: "" });
  };
  render() {
    const { getPerson } = this.props;
    const { auth } = this.props;
    console.log(this.props);

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div>
        <form id="addPost" onSubmit={this.handleSubmit}>
          <div>
            <input
              type=" text"
              className="field"
              id="title"
              onChange={this.handleChange}
              placeholder="Add post"
              required
              value={this.state.title}
            />
          </div>
          <div>
            <input
              type="text"
              className="field"
              id="content"
              onChange={this.handleChange}
              placeholder="Add content"
              required
              value={this.state.content}
            />
          </div>
          <div>
            <select
              id="personid"
              onChange={this.handleChange}
              className="select-css"
            >
              <option>select person</option>
              {getPerson.loading ? (
                <option disabled>getPerson loading...</option>
              ) : (
                getPerson.person.map(person => {
                  return (
                    <option key={person.id} value={person.id}>
                      {" "}
                      {person.firstname} {person.lastname}{" "}
                    </option>
                  );
                })
              )}
            </select>
          </div>
          <br />
          <button>Add post</button>
        </form>
      </div>
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
  graphql(getPerson, { name: "getPerson" }),
  graphql(addPostMutation, { name: "addPostMutation" }),
  connect(mapStateToProps, null)
)(Addpost);
