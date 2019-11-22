import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, graphql, withApollo } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";
import { compose } from "recompose";

var base64 = require("base-64");
var utf8 = require("utf8");

const mapStateToProps = state => ({
  items: state.items
});

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(ACTIONS.createItem(item)),
//   deleteItem: id => dispatch(ACTIONS.deleteItem(id))
// });

const LOGIN_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      iduser
      username
      userpassword
    }
  }
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    var text = "User:";
    text = text.concat(this.state.userName);
    var bytes = utf8.encode(text);
    var encoded = base64.encode(bytes);

    const userData = {
      id: encoded
    };
    this.props.client
      .query({
        query: LOGIN_QUERY,
        variables: userData
      })
      .then(data => {
        console.log("data", data.data);
        // window.localStorage.setItem("user", JSON.stringify(data.data));
        // this.props.history.push("/employeeDashboard");
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your TeamUp Account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="string"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps), withApollo)(Login);
