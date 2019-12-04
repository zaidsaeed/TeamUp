import React, { Component } from "react";
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
const ADD_MEMBER = gql`
  mutation createMember($idteam: Int!, $iduser: Int!) {
    createMember(input: { idteam: $idteam, iduser: $iduser }) {
      member {
        id
        idteam
        iduser
      }
    }
  }
`;

class AcceptStudent extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div
        className="w-50 mx-auto"
        style={{
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          display: "flex"
        }}
      >
        <input
          type="String"
          className="form-control form-control-lg"
          placeholder="email"
          name="email"
          onChange={this.onChange}
        />

        <button
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-secondary btn-lg btn-block"
          onClick={this.send}
        >
          Send email
        </button>
      </div>
    );
  }
}
export default AcceptStudent;
