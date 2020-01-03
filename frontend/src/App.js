import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Nav from "../src/components/layouts/Nav";
import Signup from "./components/Signup";
import Postcombine from "./components/Postcombine";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./components/Search";
import PersonDetails from "./components/PersonDetails";
import AddPerson from "./components/AddPerson";

import Signin from "./components/Signin";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:5000/graphql"
  }),
  cache: new InMemoryCache()
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Nav />
          <Route exact path="/" component={Search} />
          <Route exact path="/person" component={PersonDetails} />
          <Route exact path="/addperson" component={AddPerson} />
          <Route exact path="/addpost" component={Postcombine} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
