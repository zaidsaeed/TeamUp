import React from "react";
import Navbar from "./AppComponents/Navbar";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./AppComponents/SignUp";
import Login from "./AppComponents/Login";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={reduxStore}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </ReduxProvider>
    </ApolloProvider>
  );
}

export default App;
