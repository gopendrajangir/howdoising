import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Settings = ({ history, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div>{history.push("/login")}</div>;
  }
  return <h1>Settings</h1>;
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
