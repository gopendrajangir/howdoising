import React, { PropsWithChildren, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { loginSelector } from 'selectors';

import useMenu from 'hooks/useMenu';

import SearchRecordings from 'components/SearchRecordings';
import NotificationsMenu from 'components/Notifications/NotificationsMenu';
import NavigationLinks from './NavigationLinks';
import NavigationLinksMobile from './NavigationLinksMobile';
import UserImage from 'components/UserImage';
import NavLink from './NavLink';

import Sprite from 'assets/img/sprite.svg';
import Logo from 'assets/img/logo.svg';

const classes = {
  nav: "bg-slate-900 pr-2 flex flex-row items-center w-full relative z-50 h-16",
  logo: "text-lg",
  toggler: "hidden",
  togglerMobile: "2md:flex ml-3 mr-1"
}

function NavigationBar() {
  const navigationMenuRef = useRef(null);
  const navigationBtnRef = useRef(null);

  const navigate = useNavigate();

  const [showNavigation, setShowNavigation] = useMenu(navigationMenuRef, navigationBtnRef);

  const { isLoggedIn, user } = useSelector(loginSelector);

  return (
    <nav className={classes.nav}>
      <NavLink className={classes.logo} to="/">
        <img className="h-10" src={Logo} alt="logo" />
      </NavLink>
      <NavigationLinks />
      {
        showNavigation &&
        <NavigationLinksMobile navRef={navigationMenuRef} setShowNavigation={setShowNavigation} />
      }
      <SearchRecordings className="ml-auto mr-auto hidden 2md:flex" />
      {
        isLoggedIn && user &&
        <div className="ml-3 hidden 2md:flex">
          <span>
            <NotificationsMenu unreadNotifications={user.unreadNotifications} notifications={user.notifications} />
          </span>
        </div>
      }
      {
        isLoggedIn && user &&
        <button onClick={() => navigate('/profile')} className="flex items-center hidden ml-3 2md:flex">
          <UserImage photo={user.photo} name={user.name} />
        </button>
      }
      <div className={`${classes.toggler} ${classes.togglerMobile}`}>
        <button ref={navigationBtnRef}>
          <svg className="h-6 w-6 fill-slate-300">
            <use xlinkHref={`${Sprite}#icon-menu`} />
          </svg>
        </button>
      </div>
    </nav>)
}

export default NavigationBar;