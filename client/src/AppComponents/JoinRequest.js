import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, graphql, withApollo } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";
import { compose } from "recompose";
import classnames from "classnames";


// const STUDENT= window.localStorage.setItem("user", JSON.stringify(data.data));



// const JOIN_REQUEST = gql`
//   mutation joinRequest(
//     $idteam:Int!
//     $idprof: Int!
//     $idcourse:String!
//     $idstudent: Int!
    
//   ) {
//     joinRequest(
//       input: {
//         idteam: $idteam
//         idcourse: $idcourse
//         idprof: $idprof
//         idstudent: ?????
        
        
//         }
//     ) {
//       team??? {
//         idliason
//         membersCount
//         teamname
//         idteam
//         idcourse
//         idprof
//         createdAt
//       }
//     }
//   }
// `;

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
    this.state={
        selectedTeam : null
    };
    
  }

  onTeamSelect(team) {
    //   console.log(STUDENT);
    this.setState({ selectedTeam: team});
    
  }

  renderTeam(team) {
      const currentteam = team.node;
    if (team != null)
      return (
        
          <div className="card text-white bg-success mb-3"  >
            <div className="card-header" >Team ID: {currentteam.idteam}</div>
            <div className="card-body">
              <button type="submit" className="btn btn-secondary my-2 my-sm-0" style={{float:'right'}} value={currentteam} onClick={() => this.onTeamSelect(currentteam)}>Request to join team</button>
              <h3 className="card-title">{currentteam.teamname}</h3>
              <h6 className="card-title">{currentteam.idcourse}</h6>
              <p className="card-text">Maximum number of students is: {currentteam.membersCount}</p>

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


