import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Profile = ({ isLoggedIn }) => {
  return (
    <div className="profile-container">
      {!isLoggedIn ? (
        <Redirect to="/login" />
      ) : (
        <h1 className="route-heading">Profile</h1>
      )}
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

export default connect(mapStateToProps)(Profile);
