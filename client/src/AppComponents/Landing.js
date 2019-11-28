import React, { Component } from "react";
var Background = require("../background.png");

export default class Landing extends Component {
  render() {
    return (
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          marginBottom: "-50px"
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: " 100%"
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1
                  className="display-3 mb-4"
                  style={{ color: "white", marginTop: "15px" }}
                >
                  Team Up App
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
