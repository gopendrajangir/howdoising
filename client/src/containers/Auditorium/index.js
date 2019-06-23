import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Auditorium = () => {
  return (
    <div className="auditorium-container">
      <h1>Auditorium</h1>;
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

export default withRouter(connect(mapStateToProps)(Auditorium));
