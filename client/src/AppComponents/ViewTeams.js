import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, graphql, withApollo } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";
import { compose } from "recompose";
import classnames from "classnames";

const VIEWTEAMS_QUERY = gql`
  query {
    allTeams {
      edges {
        node {
          teamname
          idteam
          idcourse
          membersCount
          createdAt
          idliason
        }
      }
    }
  }
`;

class ViewTeams extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   TEAMS: VIEWTEAMS_QUERY
    // };
  }

  renderTeam(team) {
    if (team != null)
      return (
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
          <div class="card-header">Header</div>
          <div class="card-body">
            <h4 class="card-title">Primary card title</h4>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      );
    else return <div></div>;
  }

  render() {
    // const list = TEAMS.map(team => {
    //   return (
    //     <div className="col-12 col-md-5 m-1">
    //       <Card key={team.idteam}>
    //         <CardTitle>{team.teamname}</CardTitle>
    //       </Card>
    //     </div>
    //   );
    // });

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

            // return (
            //   <Fragment>
            //     {data.ordered_hotels.map((hotelItem, index) => (
            //       <HotelItem key={index} hotelItem={hotelItem} />
            //     ))}
            //   </Fragment>
            // );
          }}
        </Query>
      </div>
    );
  }
}
export default ViewTeams;

// export default graphql(VIEWTEAMS_QUERY)(ViewTeams);
