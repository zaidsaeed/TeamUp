import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation, graphql, withApollo } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";
import { compose } from "recompose";
import classnames from "classnames";
import NewCourse from "./NewCourse";

var base64 = require("base-64");
var utf8 = require("utf8");

const VIEWTEAMS_QUERY = gql`
  query {
    allTeams {
      edges {
        node {
          teamname
          id
          idcourse
          membersCount
          createdAt
          idliason
          idprof
        }
      }
    }
  }
`;

const NEW_REQUEST = gql`
  mutation createRequest($idteam: Int!, $idliason: Int!, $idstudent: Int!, $email: String!) {
    createRequest(
      input: { idteam: $idteam, idliason: $idliason, idstudent: $idstudent, email: $email }
    ) {
      request {
        idteam
      }
    }
  }
`;

class JoinRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: null
    };
  }

  onTeamSelect(team) {
    //   console.log(STUDENT);
    var studentId = JSON.parse(window.localStorage.getItem("user")).user.id;
    var studentEmail = JSON.parse(window.localStorage.getItem("user")).user.email;
    const REQUEST = {
      idteam: utf8.decode(base64.decode(team.id)).replace("TeamSchema:", ""),
      idliason: team.idliason,
      idstudent: utf8
        .decode(base64.decode(studentId))
        .replace("UserSchema:", ""),
      email: studentEmail
    };
    console.log(REQUEST);
    this.props.client.mutate({
      mutation: NEW_REQUEST,
      variables: REQUEST
    });
  }

  renderTeam(team) {
    const currentteam = team.node;
    if (team != null)
      return (
        <div className="card text-white bg-success mb-3">
          <div className="card-header">
            Team ID:{" "}
            {utf8
              .decode(base64.decode(currentteam.id))
              .replace("TeamSchema:", "")}
          </div>
          <div className="card-body">
            <button
              type="submit"
              className="btn btn-secondary my-2 my-sm-0"
              style={{ float: "right" }}
              value={currentteam}
              onClick={() => this.onTeamSelect(currentteam)}
            >
              Request to join team
            </button>
            <h3 className="card-title">{currentteam.teamname}</h3>
            <h6 className="card-title">{currentteam.idcourse}</h6>
            <p className="card-text">
              Maximum number of students is: {currentteam.membersCount}
            </p>
          </div>
        </div>
      );
    else return <div></div>;
  }

  render() {
    console.log(this.props);
    // console.log(STUDENT);
    // console.log(IDSTUDENT);
    console.log("render started ");

    return (
      <div className="container">
        <Query query={VIEWTEAMS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h4> Loading </h4>;
            }
            if (error) {
              console.log(error);
            }
            console.log("DATA", data);

            return (
              <div style={{ marginTop: "30px" }}>
                {Object.values(data.allTeams.edges).map((team, index) =>
                  this.renderTeam(team)
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default withApollo(JoinRequest);
