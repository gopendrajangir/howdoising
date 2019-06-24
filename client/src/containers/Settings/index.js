import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Sessions from "./sessions";

import SvgSprite from "assets/images/sprite.svg";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      selectedClass: "settings-navigation-links-link-selected"
    };

    this.selectSettingsLink = this.selectSettingsLink.bind(this);
  }

  componentDidMout() {
    const { history, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      history.push("/login");
    }
  }

  selectSettingsLink(current) {
    return () => {
      this.setState({ current });
    };
  }

  render() {
    const { current, selectedClass } = this.state;

    return (
      <div className="settings-container">
        <h1 className="route-heading">
          <span>Settings</span>
        </h1>
        <div className="settings">
          <div className="settings-navigation">
            <div className="settings-navigation-links">
              <div className="settings-navigation-links-link">
                <button
                  className={
                    current === 1
                      ? `settings-navigation-links-link-button ${selectedClass}`
                      : "settings-navigation-links-link-button"
                  }
                  type="button"
                  onClick={this.selectSettingsLink(1)}
                >
                  <span className="settings-navigation-links-link-button-icon">
                    <svg>
                      <use xlinkHref={`${SvgSprite}#icon-user`} />
                    </svg>
                  </span>
                  <span className="settings-navigation-links-link-button-title">
                    Personal Info
                  </span>
                </button>
              </div>
              <div className="settings-navigation-links-link">
                <button
                  className={
                    current === 2
                      ? `settings-navigation-links-link-button ${selectedClass}`
                      : "settings-navigation-links-link-button"
                  }
                  type="button"
                  onClick={this.selectSettingsLink(2)}
                >
                  <span className="settings-navigation-links-link-button-icon">
                    <svg>
                      <use xlinkHref={`${SvgSprite}#icon-lock-closed`} />
                    </svg>
                  </span>
                  <span className="settings-navigation-links-link-button-title">
                    Security
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="settings-main">
            {current === 1 && (
              <div className="settings-main-content">
                <h1>Personal Info</h1>
              </div>
            )}
            {current === 2 && (
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
