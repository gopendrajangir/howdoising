import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Profile = ({ history, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div>{history.push("/login")}</div>;
  }
  return (
    <div className="profile-container">
      <h1 class="route-heading">Profile</h1>
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

export default withRouter(connect(mapStateToProps)(Profile));
