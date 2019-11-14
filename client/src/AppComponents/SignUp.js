import React, { Component } from "react";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation createUser(
    $iduser: Int!
    $username: String!
    $userpassword: String!
  ) {
    createUser(
      input: {
        iduser: $iduser
        username: $username
        userpassword: $userpassword
      }
    ) {
      user {
        id
        iduser
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
      userpassword: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
                        userpassword: this.state.userpassword
                      };
                      console.log("newEmployee", newUser);
                      createUser({ variables: newUser });
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

export default graphql(SIGN_UP)(SignUp);
