import React, { Component } from "react";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "recompose";
import classnames from "classnames";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";

// const mapDispatchToProps = dispatch => ({
//   addUser: user => dispatch(ACTIONS.addUser(user))
// });

const CREATE_TEAM = gql`
  mutation createTeam(
    $membersCount: Int!
    $teamname:String!
    $liasonId: Int!
    $idteam:Int!
    $idcourse:String!
    $idprof: Int!
    $createdAt: Date!
  ) {
    createTeam(
      input: {
        membersCount: $membersCount
        liasonId: $liasonId
        teamname: $teamname
        idteam: $idteam
        idcourse: $idcourse
        idprof: $idprof
        createdAt: $createdAt
        
        }
    ) {
      team {
        liasonId
        membersCount
        teamname
        idteam
        idcourse
        idprof
        createdAt
      }
    }
  }
`;

class CreateTeam extends Component {
  constructor() {
    super();
    this.state = {
        liasonId:"",
        membersCount: "",
        teamname: "",
        idteam: "",
        idcourse:"", 
        idprof: "",
        createdAt:"", 
        errors: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

//   setType = type => {
//     this.setState({
//       usertype: type
//     });
//     console.log(type);
//   };

  render() {
      console.log(this.props)
    return (
      <Mutation mutation={CREATE_TEAM}>
        {(createTeam, { data }) => (
          <div className="register mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Create Team</h1>
                  <p className="lead text-center">
                    Create your Team 
                  </p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newTeam = {
                        idcourse:this.state.idcourse,
                        liasonId: parseInt(this.state.liasonId),
                        membersCount: parseInt(this.state.membersCount),
                        teamname: this.state.teamname,
                        idteam: parseInt(this.state.idteam),
                        idprof: parseInt(this.state.idprof),
                        createdAt: this.state.createdAt
                      };
                      console.log("newTeam", newTeam);
                      createTeam({ variables: newTeam })
                        .then(data => {
                          console.log(data);
                          
                        //   this.props.addTeam(data.data.createTeam.team);
                        //   console.log(data);
                        //   if (data.data.createUser.user.usertype === "S") {
                        //     this.props.history.push("/studentChoicesMenu");
                        //   } else {
                        //     this.props.history.push("/teacherChoicesMenu");
                        //   }
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
                        name="liasonId"
                        maxLength="9"
                        className="form-control form-control-lg"
                        placeholder="Liason Id:"
                        value={this.state.liasonId}
                        onChange={this.onChange}
                        type="Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="idteam"
                        maxLength="9"
                        className="form-control form-control-lg"
                        placeholder="Team Id:"
                        value={this.state.idteam}
                        onChange={this.onChange}
                        type="Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="idprof"
                        maxLength="9"
                        className="form-control form-control-lg"
                        placeholder="Professor ID:"
                        value={this.state.idprof}
                        onChange={this.onChange}
                        type="Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="idcourse"
                        maxLength="9"
                        className="form-control form-control-lg"
                        placeholder="Course ID:"
                        value={this.state.idcourse}
                        onChange={this.onChange}
                        type="String"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="membersCount"
                        maxLength="9"
                        className="form-control form-control-lg"
                        placeholder="M"
                        value={this.state.membersCount}
                        onChange={this.onChange}
                        type="Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className="form-control form-control-lg"
                        placeholder="Team name"
                        name="teamname"
                        value={this.state.teamname}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className="form-control form-control-lg"
                        placeholder="yyyy-mm-dd"
                        name="createdAt"
                        value={this.state.createdAt}
                        onChange={this.onChange}
                      />
                    </div>

                    {/* <div className="btn-group btn-group-toggle">
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
                    </div> */}
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

export default graphql(CREATE_TEAM)(CreateTeam);
