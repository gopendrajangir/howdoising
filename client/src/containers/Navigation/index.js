import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "actions/auth";

import NavigationProtectedRoutes from "components/Navigation/navigationProtectedRoutes";

const Navigation = ({ isLoggedIn, user }) => {
  return (
    <div className="app-navigation">
      <div className="app-navigation-logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="app-navigation-pages">
        <Link to="/">Home</Link>
        <Link to="/auditorium">Auditorium</Link>
      </div>
      <div className="app-navigation-auth">
        {isLoggedIn ? (
          <NavigationProtectedRoutes user={user} />
        ) : (
          <div className="app-navigation-auth-public">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
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

export default connect(
  mapStateToProps,
  { logOutUser: logOut }
)(Navigation);
