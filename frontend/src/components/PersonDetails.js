import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { compose } from "redux";

const getPerson = gql`
  {
    person {
      id
      firstname
      lastname
      email
      image
      post {
        title
      }
      parents {
        father
        mother
      }
    }
  }
`;

export class PersonDetails extends Component {
  render() {
    const { auth } = this.props;
    const { data } = this.props;
    //console.log(this.props);

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        {data.loading ? (
          <div>data loading.....</div>
        ) : (
          data.person.map(person => {
            return (
              <div className="whole">
                <div className="Personcontainer">
                  <div className="box">
                    <h4 key={person.id}>
                      <b>
                        {person.firstname} {person.lastname}
                      </b>
                    </h4>
                    <img
                      src={person.image}
                      style={{ width: "200px" }}
                      alt="pics from cloudnairy"
                    />
                    <p>Email: {person.email}</p>
                    {person.post.map(post => {
                      return <p>Title: {post.title}</p>;
                    })}
                    {person.parents.map(parent => {
                      return (
                        <div>
                          <p>Father: {parent.father}</p>
                          <p>Mother: {parent.mother}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    person: state.person.person
  };
};

export default compose(
  graphql(getPerson),
  connect(mapStateToProps, null)
)(PersonDetails);
