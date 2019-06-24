import React from "react";
import ChromeImage from "assets/images/browsers/chrome.png";
import FirefoxImage from "assets/images/browsers/firefox.png";
import SafariImage from "assets/images/browsers/safari.jpg";
import EdgeImage from "assets/images/browsers/edge.png";
import QuestionImage from "assets/images/browsers/question.png";

import DesktopImage from "assets/images/devices/desktop.png";
import MobileImage from "assets/images/devices/mobile.jpg";
import TabletImage from "assets/images/devices/tablet.jpg";
import iPodImage from "assets/images/devices/ipod.png";
import iPadImage from "assets/images/devices/ipad.png";

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: null,
      error: null
    };
    this.removeSession = this.removeSession.bind(this);
  }

  fetchSessions() {
    window
      .fetch("/apis/users/sessions")
      .then(results => {
        if (results.status === 500) {
          throw Error("Internal Server Error");
        }
        return results.json();
      })
      .then(data => {
        let myDevice;
        const sessions = data.sessions.map(sess => {
          const session = sess.session;
          const devices = Object.keys(session.devices);
          for (let i = 0; i < devices.length; i++) {
            if (session.devices[devices[i]]) {
              myDevice = devices[i];
              break;
            }
          }
          session.device = myDevice;
          return sess;
        });
        this.setState({
          sessions
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  removeSession(oid) {
    window
      .fetch(`/apis/users/session/logout/${oid}`)
      .then(results => {
        if (results.status === 404) {
          this.fetchSessions();
        } else if (results.status === 200) {
          this.fetchSessions();
        } else if (results.status === 500) {
          throw Error("Internal Server Error");
        }
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  componentDidMount() {
    this.fetchSessions();
  }

  render() {
    const { sessions, error } = this.state;
    const { uid } = this.props;

    return (
      <div className="sessions-container">
        <div className="sessions">
          <h1 className="sessions-heading">Your Devices</h1>
          <div className="sessions-error">{error}</div>
          {sessions &&
            sessions.map(session => {
              return (
                <div key={session.oid} className="sessions-session">
                  <div className="sessions-session-details">
                    <div className="sessions-session-details-browser">
                      <img
                        className="sessions-session-details-browser-icon"
                        src={
                          session.session.browser === "Chrome"
                            ? ChromeImage
                            : session.session.browser === "Firefox"
                            ? FirefoxImage
                            : session.session.browser === "Safari"
                            ? SafariImage
                            : session.session.browser === "Edge"
                            ? EdgeImage
                            : QuestionImage
                        }
                        alt="chrome"
                      />
                      <span className="sessions-session-details-browser-title">
                        {session.session.browser}
                      </span>
                    </div>
                    <div className="sessions-session-details-os">
                      {session.session.os}
                    </div>
                    <div className="sessions-session-details-device">
                      <img
                        className="sessions-session-details-device-icon"
                        src={
                          session.session.device === "Desktop"
                            ? DesktopImage
                            : session.session.device === "Mobile"
                            ? MobileImage
                            : session.session.device === "Tablet"
                            ? TabletImage
                            : session.session.device === "iPod"
                            ? iPodImage
                            : session.session.device === "iPad"
                            ? iPadImage
                            : QuestionImage
                        }
                        alt="chrome"
                      />
                      <span className="sessions-session-details-device-title">
                        {session.session.device}
                      </span>
                    </div>
                  </div>
                  <div className="sessions-session-options">
                    {uid !== session.session.uid ? (
                      <button
                        type="button"
                        onClick={this.removeSession(session.oid)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
