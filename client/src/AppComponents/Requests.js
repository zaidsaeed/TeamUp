import React, { Component } from "react";

export default class Requests extends Component {
  renderRequest(request) {
    console.log(request);
    return (
      <tr>
        <th scope="row">{request.idstudent}</th>
        <td>
          <button type="button" class="btn btn-primary">
            Accept
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-secondary">
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
            {this.props.requests.map(request => this.renderRequest(request))}
          </tbody>
        </table>
      </div>
    );
  }
}
