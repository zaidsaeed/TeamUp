import React from "react";
import Navbar from "./AppComponents/Navbar";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./AppComponents/SignUp";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route exact path="/" component={SignUp} />
          <Navbar />
          <h1>Register user</h1>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
