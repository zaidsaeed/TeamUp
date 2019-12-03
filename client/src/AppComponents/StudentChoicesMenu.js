import React, { Component } from "react";
import { Link } from "react-router-dom";

class StudentChoicesMenu extends Component {
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
