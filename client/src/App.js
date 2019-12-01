import React from "react";
import Navbar from "./AppComponents/Navbar";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./AppComponents/SignUp";
import Login from "./AppComponents/Login";
import Landing from "./AppComponents/Landing";
import StudentChoicesMenu from "./AppComponents/StudentChoicesMenu";
import ProfChoicesMenu from "./AppComponents/ProfChoicesMenu";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import CreateTeam from "./AppComponents/CreateTeam";
import ViewTeams from "./AppComponents/ViewTeams";
import NewCourse from "./AppComponents/NewCourse";
import JoinRequest from "./AppComponents/JoinRequest"


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
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/navbar" component={Navbar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/CreateTeam" component={CreateTeam} />
            <Route exact path="/ViewTeams" component={ViewTeams} />
            <Route exact path="/studentChoicesMenu"component={StudentChoicesMenu}/>
            <Route exact path="/profChoicesMenu" component={ProfChoicesMenu} />
            <Route exact path="/SetupCourse" component={NewCourse} />
            <Route exact path="/JoinRequest" component={JoinRequest} />

          </div>
        </Router>
      </ReduxProvider>
    </ApolloProvider>
  );
}

export default App;
