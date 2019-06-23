import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Auditorium = () => {
  return <h1>Auditorium</h1>;
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(Auditorium));
