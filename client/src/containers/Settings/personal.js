import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null
    };
  }

  fetchUserDetails() {
    const { uid, history } = this.props;
    window
      .fetch(`/apis/users/private/profile/${uid}`)
      .then(results => {
        if (results.status === 404) {
          this.setState({
            error: "Could not find user details"
          });
        } else if (results.status === 403) {
          history.push("/logout");
        } else if (results.status === 500) {
          throw Error("Internal Server Error");
        } else {
          return results.json();
        }
      })
      .then(data => {
        this.setState({
          user: data.user
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  render() {
    const { user, error } = this.state;

    return (
      <div className="private-profile-container">
        <div className="private-profile">
          {error}
          {user && (
            <div className="private-profile-details">
              <h1>{user.displayname}</h1>
            </div>
          )}
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

export default withRouter(connect(mapStateToProps)(PersonalInfo));
