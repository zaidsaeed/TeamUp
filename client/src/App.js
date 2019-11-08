import React from "react";
import Navbar from "./AppComponents/Navbar";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <h1>Register user</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
