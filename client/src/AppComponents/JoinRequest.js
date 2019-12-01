import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, graphql, withApollo } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";
import { compose } from "recompose";
import classnames from "classnames";

const VIEWTEAMS_QUERY = gql`
  query{
  allTeams {
    edges {
      node {
        teamname
        idteam
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

class JoinRequest extends Component {
  constructor(props) {
    super(props);
    
  }

  renderTeam(team) {
    if (team != null)
      return (
        
          <div className="card text-white bg-success mb-3" >
            <div className="card-header" >Team ID: {team.node.idteam}</div>
            <div className="card-body">
              <button type="submit" class="btn btn-secondary my-2 my-sm-0" style={{float:'right'}}>Request to join team</button>
              <h3 className="card-title">{team.node.teamname}</h3>
              <h6 className="card-title">{team.node.idcourse}</h6>
              <p className="card-text">Maximum number of students is: {team.node.membersCount}</p>

            </div>
          </div>
        
      );
    else return <div></div>;
  }

  render() {
    

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
              <div style={{marginTop: "30px"}}>
                {Object.values(data.allTeams.edges).map(
                  (team, index) => this.renderTeam(team)
                  
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default JoinRequest;


