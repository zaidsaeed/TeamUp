import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../redux/action";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(ACTIONS.addUser(user))
});

class Navbar extends Component {
  render() {
    const logOutBtn = (
      <Link to={{ pathname: "/" }}>
        <li className="nav-item" id="account_circle">
          <i
            style={{ hover: "pointer" }}
            className="nav-link material-icons"
            title="Log out"
            onClick={() => {
              window.localStorage.clear();
              this.props.addUser({});
            }}
          >
            highlight_off
          </i>
        </li>
      </Link>
    );

    const userNotSignedInLinks = (
      <ul className="form-inline navbar-nav my-2 my-lg-0">
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Log In
          </Link>
        </li>
      </ul>
    );

    const userSignedInLinks = (
      <ul className="form-inline navbar-nav my-2 my-lg-0">{logOutBtn}</ul>
    );

    var user = JSON.parse(window.localStorage.getItem("user"));

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link to="/" className="navbar-brand" href="#">
            TeamUpApp
          </Link>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto"></ul>
            {!user ? userNotSignedInLinks : userSignedInLinks}
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
