import React, { Component } from "react";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

const NEW_COURSE = gql`
  mutation createCourse(
    $idcoure: String!
    $idprof: Int!
    $deadline: Date!
	$minstudents: Int!
	$maxstudents: Int!
  ) {
    createUser(
      input: {
		$idcoure: $idcourse
		$idprof: $idprof
		$deadline: $deadline
		$minstudents: $minstudents
		$maxstudents: $maxstudents
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
      <Mutation mutation={NEW_COURSE}>
        {(createUser, { data }) => (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">New Course</h1>
                  <p className="lead text-center">
                    Setup Team Parameters for a Course
                  </p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newCourse = {
						idcoure: this.state.idcourse,
						idprof: parseInt(this.state.idprof),
						deadline: this.state.deadline,
						minstudents: parseInt(this.state.minstudents),
						maxstudents: parseInt(this.state.maxstudents)
                      };
                      console.log("newCourse", newUser);
                      createUser({ variables: newUser });
                    }}
                  >
                    <div className="form-group">
                      <input
                        name="idcourse"
                        maxLength="5"
                        className="form-control form-control-lg"
                        placeholder="Course ID:"
                        value={this.state.idcourse}
                        onChange={this.onChange}
						type="String"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="Number"
                        className="form-control form-control-lg"
                        placeholder="(WILL REMOVE THIS) Prof ID:"
                        name="idprof"
                        value={this.state.idprof}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="Date"
                        className="form-control form-control-lg"
                        placeholder="User Password:"
                        name="deadline"
                        value={this.state.deadline}
                        onChange={this.onChange}
                      />
                    </div>

					<div className="form-group">
                      <input
                        type="Number
                        className="form-control form-control-lg"
                        placeholder="Minimum Students:"
                        name="minstudent"
                        value={this.state.minstudents}
                        onChange={this.onChange}
                      />
                    </div>
                   
				   <div className="form-group">
                      <input
                        type="Number
                        className="form-control form-control-lg"
                        placeholder="Maximum Students:"
                        name="maxstudent"
                        value={this.state.maxstudents}
                        onChange={this.onChange}

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
