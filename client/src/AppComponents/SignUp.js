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
  ) {
    createUser(
      input: {
        iduser: $iduser
        username: $username
        userpassword: $userpassword
        usertype: $usertype
      }
    ) {
      user {
        id
        iduser
        username
        userpassword
        usertype
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
      usertype: ""
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
          <div className="register">
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
                      const newUser = {
                        iduser: parseInt(this.state.iduser),
                        username: this.state.username,
                        userpassword: this.state.userpassword,
                        usertype: this.state.usertype
                      };
                      console.log("newUser", newUser);
                      createUser({ variables: newUser })
                        .then(data => {
                          console.log("success");
                          console.log(this.props);
                          this.props.addUser(data);
                          console.log(data);
                        })
                        .catch(err => {
                          console.log("failure");
                          console.log(err);
                        });
                    }}
                  >
                    <div className="form-group">
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

                    <div class="btn-group btn-group-toggle">
                      <label
                        className={classnames("btn btn-primary", {
                          active: this.state.usertype == "S"
                        })}
                      >
                        <input
                          type="checkbox"
                          autocomplete="off"
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
                          autocomplete="off"
                          onClick={() => this.setType("T")}
                        />{" "}
                        Teacher
                      </label>
                    </div>

                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
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
