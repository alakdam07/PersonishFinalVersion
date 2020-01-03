import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

export const getPost = gql`
  {
    post {
      id
      title
      content
    }
  }
`;

export class Post extends Component {
  render() {
    // console.log(this.props);

    const { data } = this.props;

    return (
      <div>
        <ul>
          {data.loading ? (
            <div>(post is loading)</div>
          ) : (
            data.post.map(post => {
              return (
                <li key={post.id} style={{ listStyle: "none" }}>
                  {" "}
                  {post.title} {post.content}{" "}
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

export default graphql(getPost)(Post);
