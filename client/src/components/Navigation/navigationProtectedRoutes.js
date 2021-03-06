import React from "react";
import SvgSprite from "assets/images/sprite.svg";
import UserImage from "assets/images/user.jpg";
import { Link } from "react-router-dom";
import $ from "jquery";

const ProtectedRoutes = ({ user }) => {
  const body = document.getElementsByTagName("body")[0];

  body.addEventListener("click", event => {
    const profileNavLabel = $(".app-navigation-auth-protected-profile-head");
    const profileNavigation = $(".app-navigation-auth-protected-profile-nav");
    const profileNavigationInput = $("#app-profile-navigation");

    if (profileNavigation) {
      if (
        !profileNavigation.has($(event.target)).length &&
        ($(event.target).is(profileNavigation) ||
          profileNavLabel.has($(event.target)).length ||
          $(event.target).is(profileNavLabel) ||
          $(event.target).is(profileNavigationInput))
      ) {
      } else {
        profileNavigationInput.prop("checked", false);
        profileNavigation.css("display", "none !important");
      }
    }

    const notificationsNavLabel = $(
      ".app-navigation-auth-protected-notifications-head"
    );
    const notificationsNavigation = $(
      ".app-navigation-auth-protected-notifications-list"
    );
    const notificationsNavigationInput = $("#app-notifications-navigation");

    if (notificationsNavigation) {
      if (
        !notificationsNavigation.has($(event.target)).length &&
        ($(event.target).is(notificationsNavigation) ||
          notificationsNavLabel.has($(event.target)).length ||
          $(event.target).is(notificationsNavLabel) ||
          $(event.target).is(notificationsNavigationInput))
      ) {
      } else {
        notificationsNavigationInput.prop("checked", false);
        notificationsNavigation.css("display", "none !important");
      }
    }
  });

  return (
    <div className="app-navigation-auth-protected">
      <span className="app-navigation-auth-protected-sing">
        <Link className="app-navigation-auth-protected-sing-link" to="/sing">
          <span className="app-navigation-auth-protected-sing-link-icon">
            <svg>
              <use xlinkHref={`${SvgSprite}#icon-microphone`} />
            </svg>
          </span>
          <span className="app-navigation-auth-protected-sing-link-title">
            Sing
          </span>
        </Link>
      </span>
      <span className="app-navigation-auth-protected-notifications">
        <label
          htmlFor="app-notifications-navigation"
          className="app-navigation-auth-protected-notifications-head"
        >
          <span className="app-navigation-auth-protected-notifications-head-icon">
            <span className="app-navigation-auth-protected-notifications-head-icon-number">
              9+
            </span>
            <svg>
              <use xlinkHref={`${SvgSprite}#icon-bell`} />
            </svg>
          </span>
        </label>
        <input hidden id="app-notifications-navigation" type="checkbox" />
        <span className="app-navigation-auth-protected-notifications-list">
          Empty
        </span>
      </span>
      <span className="app-navigation-auth-protected-profile">
        <label
          htmlFor="app-profile-navigation"
          className="app-navigation-auth-protected-profile-head"
        >
          <span className="app-navigation-auth-protected-profile-head-image">
            <img
              src={`/apis/images/${user.image.$id}`}
              alt="user"
              onError={event => {
                event.target.src = UserImage;
              }}
            />
          </span>
          <span className="app-navigation-auth-protected-profile-head-name">
            {user.displayname}
          </span>
          <span className="app-navigation-auth-protected-profile-head-icon">
            <svg>
              <use xlinkHref={`${SvgSprite}#icon-cheveron-down`} />
            </svg>
          </span>
        </label>
        <input hidden id="app-profile-navigation" type="checkbox" />
        <span className="app-navigation-auth-protected-profile-nav">
          <Link
            className="app-navigation-auth-protected-profile-nav-link"
            to="/profile"
          >
            <span className="app-navigation-auth-protected-profile-nav-link-icon">
              <svg>
                <use xlinkHref={`${SvgSprite}#icon-user`} />
              </svg>
            </span>
            <span className="app-navigation-auth-protected-profile-nav-link-title">
              Profile
            </span>
          </Link>
          <Link
            className="app-navigation-auth-protected-profile-nav-link"
            to="/settings/personal"
          >
            <span className="app-navigation-auth-protected-profile-nav-link-icon">
              <svg>
                <use xlinkHref={`${SvgSprite}#icon-cog`} />
              </svg>
            </span>
            <span className="app-navigation-auth-protected-profile-nav-link-title">
              Settings
            </span>
          </Link>
          <Link
            className="app-navigation-auth-protected-profile-nav-link"
            to="/logout"
          >
            <span className="app-navigation-auth-protected-profile-nav-link-icon">
              <svg>
                <use xlinkHref={`${SvgSprite}#icon-switch`} />
              </svg>
            </span>
            <span className="app-navigation-auth-protected-profile-nav-link-title">
              Logout
            </span>
          </Link>
        </span>
      </span>
    </div>
  );
};

export default ProtectedRoutes;
