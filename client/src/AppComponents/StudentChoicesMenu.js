import React, { Component } from "react";
import { Link } from "react-router-dom";
import Requests from "./Requests";
import { withApollo } from "react-apollo";
import { request } from "http";

class StudentChoicesMenu extends Component {
  constructor() {
    super();
    const student = JSON.parse(window.localStorage.getItem("user")).user;
    console.log("student is here", student);
    this.state = {
      requests: student ? student.requests : []
    };
  }
  render() {
    return (
      <div
        className="w-50 mx-auto"
        style={{
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          display: "flex"
        }}
      >
        {this.state.requests.length > 0 ? (
          <Requests
            requests={this.state.requests}
            updateState={newRequests => {
              this.setState({ requests: newRequests });
            }}
          />
        ) : (
          ""
        )}
        <Link
          to="/createteam"
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-secondary btn-lg btn-block"
        >
          Create Team
        </Link>
        <Link
          to="/joinrequest"
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-secondary btn-lg btn-block"
        >
          Join Team
        </Link>
      </div>
    );
  }
}

export default withApollo(StudentChoicesMenu);
