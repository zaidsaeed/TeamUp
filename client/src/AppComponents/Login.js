import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, graphql, withApollo } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";
import { compose } from "recompose";
import classnames from "classnames";

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
      idNumber: "",
      password: "",
      errors: { idNumber: "", password: "" }
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
    text = text.concat(this.state.idNumber);
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
        const user = data.data.user;
        if (user.userpassword == this.state.password) {
          console.log("User successfully logged in");
        } else {
          this.setState({
            errors: {
              password: "The password you entered is incorrect"
            }
          });
        }
        // window.localStorage.setItem("user", JSON.stringify(data.data));
      })
      .catch(err => {
        console.log("err", err);
        this.setState({
          errors: {
            idNumber: "The idNumber you entered is incorrect"
          }
        });
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
                <div className="form-group has-danger">
                  <input
                    type="string"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors["idNumber"]
                    })}
                    placeholder="Id Number"
                    name="idNumber"
                    value={this.state.idNumber}
                    onChange={this.onChange}
                  />

                  <div className="invalid-feedback">
                    {this.state.errors.idNumber}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors["password"]
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.errors.password}
                  </div>
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
