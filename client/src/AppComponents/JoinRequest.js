import React, { Component } from "react";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

const NEW_REQUEST = gql`
  mutation createRequest(
    $idteam: Int!
    $idprof: Int!
    $idcourse: String!
    $idstudent: Int!
  ) {
    createRequest(
      input: {
        idteam: $idteam
        idprof: $idprof
        idcourse: $idcourse
        idstudent: $idstudent
      }
    ) {
      request {
        idteam
      }
    }
  }
`;

class newRequest extends Component {
  constructor() {
    super();
    this.state = {
      idteam: 0,
      idprof: 0,
      idcourse: "",
      idstudent: 0
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Mutation mutation={NEW_REQUEST}>
        {(createRequest, { data }) => (
          <div className="request">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">
                    Request to Join a Team
                  </h1>
                  <p className="lead text-center">Enter Team Info</p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newRequest = {
                        idteam: parseInt(this.state.idteam),
                        idprof: parseInt(this.state.idprof),
                        idcourse: this.state.idcourse,
                        idstudent: parseInt(this.state.idstudent)
                      };
                      console.log("newRequest", newRequest);
                      createRequest({ variables: newRequest });
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="Number"
                        className="form-control form-control-lg"
                        placeholder="Team ID:"
                        name="idteam"
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="Number"
                        className="form-control form-control-lg"
                        placeholder="Prof ID:"
                        name="idprof"
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        name="idcourse"
                        maxLength="7"
                        className="form-control form-control-lg"
                        placeholder="Course ID:"
                        onChange={this.onChange}
                        type="String"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="Number"
                        className="form-control form-control-lg"
                        placeholder="Student ID:"
                        name="idstudent"
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

export default graphql(NEW_REQUEST)(newRequest);
