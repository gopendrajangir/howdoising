import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Sessions from "components/Settings/sessions";
import PersonalInfo from "./personal";

import SvgSprite from "assets/images/sprite.svg";

class Settings extends React.Component {
  componentDzidMout() {
    const { history, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      history.push("/login");
    }
  }

  render() {
    const { location } = this.props;
    const selectedClass = "settings-navigation-links-link-selected";
    return (
      <div className="settings-container">
        <h1 className="route-heading">
          <span>Settings</span>
        </h1>
        <div className="settings">
          <div className="settings-navigation">
            <div className="settings-navigation-links">
              <div className="settings-navigation-links-link">
                <Link
                  to="/settings/personal"
                  className={
                    location.pathname === "/settings/personal"
                      ? `settings-navigation-links-link-anchor ${selectedClass}`
                      : "settings-navigation-links-link-anchor"
                  }
                  type="button"
                >
                  <span className="settings-navigation-links-link-anchor-icon">
                    <svg>
                      <use xlinkHref={`${SvgSprite}#icon-user`} />
                    </svg>
                  </span>
                  <span className="settings-navigation-links-link-anchor-title">
                    Personal &amp; Privacy
                  </span>
                </Link>
              </div>
              <div className="settings-navigation-links-link">
                <Link
                  to="/settings/security"
                  className={
                    location.pathname === "/settings/security"
                      ? `settings-navigation-links-link-anchor ${selectedClass}`
                      : "settings-navigation-links-link-anchor"
                  }
                  type="button"
                >
                  <span className="settings-navigation-links-link-anchor-icon">
                    <svg>
                      <use xlinkHref={`${SvgSprite}#icon-lock-closed`} />
                    </svg>
                  </span>
                  <span className="settings-navigation-links-link-anchor-title">
                    Security
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="settings-main">
            {location.pathname === "/settings/personal" && (
              <div className="settings-main-content">
                <PersonalInfo />
              </div>
            )}
            {location.pathname === "/settings/security" && (
              <div className="settings-main-content">
                <Sessions />
              </div>
            )}
          </div>
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

export default withRouter(connect(mapStateToProps)(Settings));
