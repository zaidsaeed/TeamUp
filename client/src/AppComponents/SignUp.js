import React, { Component } from "react";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "recompose";
import classnames from "classnames";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(ACTIONS.addUser(user))
});

const SIGN_UP = gql`
  mutation createUser(
    $iduser: Int!
    $username: String!
    $userpassword: String!
    $usertype: String!
    $email: String!
  ) {
    createUser(
      input: {
        iduser: $iduser
        username: $username
        userpassword: $userpassword
        usert: $usertype
        email: $email
      }
    ) {
      user {
        id
        iduser
        username
        userpassword
        usert
        email
        requests {
          id
          idteam
          idstudent
		  email
        }
      }
    }
  }
`;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      iduser: 0,
      username: "",
      userpassword: "",
      usertype: "",
      errors: "",
	  email: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setType = type => {
    this.setState({
      usertype: type
    });
    console.log(type);
  };

  render() {
    return (
      <Mutation mutation={SIGN_UP}>
        {(createUser, { data }) => (
          <div className="register mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">
                    Create your Student/Teacher account
                  </p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newUser = {user: {
                        iduser: parseInt(this.state.iduser),
                        username: this.state.username,
                        userpassword: this.state.userpassword,
                        usertype: this.state.usertype,
						email: this.state.email
                      }};
                      console.log("newUser", newUser);
                      createUser({ variables: newUser.user })
                        .then(data => {
                          window.localStorage.setItem(
                            "user",
                            JSON.stringify(newUser)
                          );
                          this.props.addUser(data.data.createUser.user);
                          console.log(data);
                          if (data.data.createUser.user.usert === "S") {
                            this.props.history.push("/studentChoicesMenu");
                          } else {
                            this.props.history.push("/profChoicesMenu");
                          }
                        })
                        .catch(err => {
                          console.log("failure");
                          console.log(err);
                          this.setState({
                            errors:
                              "Something went wrong went trying to create account. Please Change the entered info and try again"
                          });
                          console.log(this.state);
                        });
                    }}
                  >
				  <div className="form-group">
                      <input
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email (gmail only):"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="String"
                      />
                    </div>

                    <div className="form-group">
                      <label>User ID:</label>
                      <input
                        name="iduser"
                        maxLength="9"
                        className="form-control form-control-lg"
                        placeholder="User Id:"
                        value={this.state.iduser}
                        onChange={this.onChange}
                        type="Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className="form-control form-control-lg"
                        placeholder="User name"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className="form-control form-control-lg"
                        placeholder="User Password"
                        name="userpassword"
                        value={this.state.userpassword}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="btn-group btn-group-toggle">
                      <label
                        className={classnames("btn btn-primary", {
                          active: this.state.usertype == "S"
                        })}
                      >
                        <input
                          type="checkbox"
                          autoComplete="off"
                          onClick={() => this.setType("S")}
                        />{" "}
                        Student
                      </label>
                      <label
                        className={classnames("btn btn-primary", {
                          active: this.state.usertype == "T"
                        })}
                      >
                        <input
                          type="checkbox"
                          autoComplete="off"
                          onClick={() => this.setType("T")}
                        />{" "}
                        Teacher
                      </label>
                    </div>
                    <div className="text-primary">
                      <p>{this.state.errors}</p>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-block mt-4 btn-secondary"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  graphql(SIGN_UP)
)(SignUp);
