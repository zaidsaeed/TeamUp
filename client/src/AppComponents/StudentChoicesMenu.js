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

        <button
          type="button"
          className="btn btn-secondary disabled btn-lg btn-block"
          style={{ width: "100%", height: "100%" }}
        >
          Join Team
        </button>
      </div>
    );
  }
}

export default StudentChoicesMenu;
