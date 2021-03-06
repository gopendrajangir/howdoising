import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Sing = ({ history, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div>{history.push("/login")}</div>;
  }
  return <h1>Sing</h1>;
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(Sing));
