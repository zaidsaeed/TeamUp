import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const SEND_EMAIL = gql`
  mutation createEmail($email: String!, $idteam: Int!, $idcourse: String!) {
    createEmail(
      input: { email: $email, idteam: $idteam, idcourse: $idcourse }
    ) {
      course {
        id
        email
        idteam
        idcourse
      }
    }
  }
`;

const DELETE_REQ = gql`
  mutation deleteRequest($idrequest: Int!) {
    deleteRequest(input: { idrequest: $idrequest }) {
      ok
    }
  }
`;

const ADD_MEMBER = gql`
  mutation createMember($idteam: Int!, $iduser: Int!) {
    createMember(input: { idteam: $idteam, iduser: $iduser }) {
      member {
        idteam
        iduser
      }
    }
  }
`;

class Requests extends Component {
  renderRequest(request, index) {
    console.log(request);
    return (
      <tr>
        <th scope="row">{request.idstudent}</th>
        <td>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              this.props.client.mutate({
                mutation: ADD_MEMBER,
                variables: { idteam: request.idteam, iduser: request.idstudent }
              });
              this.props.client.mutate({
                mutation: DELETE_REQ,
                variables: { idrequest: request.id }
              });
              var user = JSON.parse(window.localStorage.getItem("user")).user;
              user.requests.splice(index, 1);
              user = { user: user };
              window.localStorage.setItem("user", JSON.stringify(user));
              this.props.updateState(user.user.requests);
            }}
          >
            Accept
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => {
              this.props.client.mutate({
                mutation: DELETE_REQ,
                variables: { idrequest: request.id }
              });
              var user = JSON.parse(window.localStorage.getItem("user")).user;
              user.requests.splice(index, 1);
              user = { user: user };
              window.localStorage.setItem("user", JSON.stringify(user));
              this.props.updateState(user.user.requests);
            }}
          >
            Reject
          </button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <h1> Team Join Requests</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Student Number</th>
              <th scope="col">Accept Join Request</th>
              <th scope="col">Reject Join Request</th>
            </tr>
          </thead>
          <tbody>
            {this.props.requests.map((request, index) =>
              this.renderRequest(request, index)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withApollo(Requests);
