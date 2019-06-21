import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SvgSprite from 'assets/images/sprite.svg';

const Navigation = ({ isLoggedIn, user }) => {
  return (
    <div className="app-navigation">
      <div className="app-navigation-logo">
        <Link to="/">
          Logo
        </Link>
      </div>
      <div className="app-navigation-pages">
        <Link to="/">
          Home
        </Link>
        <Link to="/auditoriam">
          Auditorium
        </Link>
      </div>
      <div className="app-navigation-auth">
      {
        isLoggedIn
        ?
        <React.Fragment>
          <span className="app-navigation-auth-record">
            <Link className="app-navigation-auth-record-link" to="/record">
              <span className="app-navigation-auth-record-link-icon">
                <svg>
                  <use xlinkHref={`${SvgSprite}#icon-microphone`} />
                </svg>
              </span>
              <span className="app-navigation-auth-record-link-title">
                Record
              </span>
            </Link>
          </span>
          <span className="app-navigation-auth-profile">
            <span className="app-navigation-auth-profile-head">
              <span className="app-navigation-auth-profile-head-image">
                <img src={`http://localhost:5000/apis/images/${user.image.$id}`} alt="user"/>
              </span>
              <span className="app-navigation-auth-profile-head-name">
              {
                user.displayname
              }
              </span>
              <span className="app-navigation-auth-profile-head-icon">
                <svg>
                  <use xlinkHref={`${SvgSprite}#icon-cheveron-down`} />
                </svg>
              </span>
            </span>
            <span className="app-navigation-auth-profile-nav">
              <Link className="app-navigation-auth-profile-nav-link" to="/profile">
                <span className="app-navigation-auth-profile-nav-link-icon">
                  <svg>
                    <use xlinkHref={`${SvgSprite}#icon-user`} />
                  </svg>
                </span>
                <span className="app-navigation-auth-profile-nav-link-title">
                  Profile
                </span>
              </Link>
              <Link className="app-navigation-auth-profile-nav-link" to="/settings">
                <span className="app-navigation-auth-profile-nav-link-icon">
                  <svg>
                    <use xlinkHref={`${SvgSprite}#icon-cog`} />
                  </svg>
                </span>
                <span className="app-navigation-auth-profile-nav-link-title">
                  Settings
                </span>
              </Link>
              <Link className="app-navigation-auth-profile-nav-link" to="/logout">
                <span className="app-navigation-auth-profile-nav-link-icon">
                  <svg>
                    <use xlinkHref={`${SvgSprite}#icon-switch`} />
                  </svg>
                </span>
                <span className="app-navigation-auth-profile-nav-link-title">
                  Logout
                </span>
              </Link>
              
            </span>
          </span>
        </React.Fragment>
        :
        <React.Fragment>
          <Link to="/signup">
            Signup
          </Link>
          <Link to="/login">
            Login
          </Link>
        </React.Fragment>
      }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Navigation);