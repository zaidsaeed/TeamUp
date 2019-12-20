import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfChoicesMenu extends Component {
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
          to="/SetupCourse"
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-secondary btn-lg btn-block"
        >
          Set Up Course Parameters
		</Link>
        <Link
          to="/ViewTeams"
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-secondary btn-lg btn-block"
        >
          View Teams 
        </Link>

      </div>
    );
  }
}

export default ProfChoicesMenu;
