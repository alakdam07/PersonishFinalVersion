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
    }
  }
`;

export class Search extends Component {
  state = {
    data: ""
  };

  nameSearch = e => {
    // console.log(e.target.value);
    this.setState({ data: e.target.value });
  };

  render() {
    //
    const { auth } = this.props;
    // console.log(this.props.data);

    const { data } = this.props;

    const NameFilter = data.loading ? (
      <div>(data is loading)</div>
    ) : (
      data.person.filter(person => {
        return person.firstname
          .toLowerCase()
          .includes(this.state.data.toLowerCase());
      })
    );
    //console.log(NameFilter);

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "#2f3640",
            height: "40px",
            borderRadius: "40px",
            padding: "10px"
          }}
        >
          <div>
            <input
              placeholder="Search for person"
              onChange={this.nameSearch}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                float: "left",
                padding: "0",
                color: "white",
                fontSize: "20px",
                transition: "0.04s",
                lineHeight: "40px"
              }}
            />
            <a
              className="search-btn"
              // eslint-disable-next-line
              href="#"
              style={{
                color: "#e84118",
                float: "right",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#2f3640",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <i class="fas fa-search"></i>
            </a>
          </div>
          <div></div>
          <br></br>
          <br></br>
          <br></br>
          {data.loading ? (
            <div>data loading</div>
          ) : (
            NameFilter.map(person => {
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
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
    // person: state.person.person
  };
};

export default compose(
  graphql(getPerson),
  connect(mapStateToProps, null)
)(Search);
//
