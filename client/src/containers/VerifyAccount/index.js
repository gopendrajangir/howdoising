import React from "react";
import { logIn } from "actions/auth";
import { connect } from "react-redux";

class VerifyAccount extends React.Component {
  componentDidMount() {
    const { match, logInUser } = this.props;

    window
      .fetch(`/apis/users/verifyAccount/${match.params.token}`, {
        method: "GET",
        credentials: "include"
      })
      .then(results => {
        if (results.status === 500) {
          throw Error("Internal Server Error");
        }
        return results.json();
      })
      .then(data => {
        if (data.msg) {
          console.log(data.msg);
        } else {
          logInUser(data.user);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div>
        <h1>VerifyAccount</h1>
      </div>
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

export default connect(
  mapStateToProps,
  {
    logInUser: logIn
  }
)(VerifyAccount);
