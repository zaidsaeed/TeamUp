import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ACTIONS from "../redux/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  items: state.items
});

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(ACTIONS.createItem(item)),
//   deleteItem: id => dispatch(ACTIONS.deleteItem(id))
// });

// const LOGIN_QUERY = gql``;

class Login extends Component {
  render() {
    console.log(this.props);
    return <div></div>;
  }
}

export default connect(mapStateToProps)(Login);
