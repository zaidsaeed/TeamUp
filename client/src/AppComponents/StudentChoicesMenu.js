import React, { Component } from "react";
import { Link } from "react-router-dom";
import Requests from "./Requests";

class StudentChoicesMenu extends Component {
  render() {
    const student = JSON.parse(window.localStorage.getItem("user")).user;
    // var requests;
    // if (student && student.requests.length > 0) {
    //   requests =
    // }
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
        {student && student.requests.length > 0 ? (
          <Requests requests={student.requests} />
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

export default StudentChoicesMenu;
