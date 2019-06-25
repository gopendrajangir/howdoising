import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { logOut } from "actions/auth";

class Logout extends React.Component {
  componentDidMount() {
    const { logOutUser } = this.props;
    window
      .fetch("/apis/users/logout")
      .then(result => {
        return result.json();
      })
      .then(data => {
        if (!data.errors) {
          logOutUser();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>{!isLoggedIn ? <Redirect to="/login" /> : <span>Logout</span>}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logOutUser: logOut }
  )(Logout)
);
