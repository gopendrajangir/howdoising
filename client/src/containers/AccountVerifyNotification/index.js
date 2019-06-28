import React from "react";
import { connect } from "react-redux";
import { logIn } from "actions/auth";
import $ from "jquery";

class AccountVerifyNotification extends React.Component {
  constructor(props) {
    super(props);
    this.sendAccountVerificationMail = this.sendAccountVerificationMail.bind(
      this
    );
  }

  sendAccountVerificationMail() {
    const { logInUser, user } = this.props;
    const email = user.email;

    return event => {
      $(event.target).prop("disabled", true);
      const jsonBody = JSON.stringify({ email });

      window
        .fetch("/apis/users/private/profile/verify", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: jsonBody
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
            $(event.target).prop("disabled", false);
          } else {
            logInUser(data.user);
          }
        })
        .catch(err => {
          $(event.target).prop("disabled", false);
          console.log(err.message);
        });
    };
  }

  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <div className="account-verify-notification">
        {!isLoggedIn
          ? null
          : user &&
            !user.isVerified && (
              <React.Fragment>
                <p className="account-verify-notification-message">
                  Email you provided for your account is not verified yet.
                  Please click on the email verification link sent to registered
                  email address. If you have not recieved the link please check
                  the email address you provided in the settings.
                </p>
                <button
                  className="account-verify-notification-button-resend"
                  type="button"
                  onClick={this.sendAccountVerificationMail()}
                >
                  Resend
                </button>
              </React.Fragment>
            )}
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
)(AccountVerifyNotification);
