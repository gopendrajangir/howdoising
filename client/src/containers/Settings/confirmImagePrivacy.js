import React from "react";
import { connect } from "react-redux";
import { logIn } from "actions/auth";

class ConfirmImagePrivacy extends React.Component {
  constructor(props) {
    super(props);
    this.changePrivacy = this.changePrivacy.bind(this);
  }

  changePrivacy(imagePrivacy, emailPrivacy) {
    const { logInUser, closeModal } = this.props;
    return () => {
      const jsonBody = JSON.stringify({
        image: imagePrivacy,
        email: emailPrivacy
      });

      window
        .fetch("/apis/users/private/profile/privacy", {
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
          } else {
            closeModal();
            logInUser(data.user);
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  }

  render() {
    const { cancelPrivacyChange, imagePrivacy, emailPrivacy } = this.props;

    return (
      <div className="confirm-image-privacy">
        <p className="confirm-image-privacy-message">
          Are you sure you want to change image from &nbsp;
          <b>{imagePrivacy === "Public" ? "Private" : "Public"}</b>&nbsp; to
          &nbsp;
          <b>{imagePrivacy}</b>.
        </p>
        <div className="private-profile-details-change-footer">
          <button
            className="private-profile-details-change-footer-button-cancel"
            type="button"
            onClick={cancelPrivacyChange(imagePrivacy)}
          >
            Cancel
          </button>
          <button
            className="private-profile-details-change-footer-button-save"
            type="button"
            onClick={this.changePrivacy(imagePrivacy, emailPrivacy)}
          >
            Confirm
          </button>
        </div>
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
)(ConfirmImagePrivacy);
