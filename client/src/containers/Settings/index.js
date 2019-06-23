import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Settings = ({ history, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div>{history.push("/login")}</div>;
  }
  return (
    <div className="settings-container">
      <h1 className="route-heading">Settings</h1>
      <div className="settings">settings</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(Settings));
