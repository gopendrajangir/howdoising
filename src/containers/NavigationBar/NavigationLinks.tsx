import React, { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logoutUser } from 'actions/auth/login';

import { loginSelector } from 'selectors';

import useMenu from 'hooks/useMenu';
import { useAppDispatch } from 'hooks/useAppDispatch';

import SearchRecordings from 'components/SearchRecordings';
import UserImage from 'components/UserImage';
import NotificationsMenu from 'components/Notifications/NotificationsMenu';
import NavLink from './NavLink';

import Sprite from 'assets/img/sprite.svg';

const classes = {
  navLinks: "flex flex-row items-center flex-1 h-full",
  navLinksMobile: "2md:hidden",
  authLink: "border border-slate-500 text-center text-slate-400 p-3 py-2 text-sm rounded hover:border-slate-900 hover:bg-slate-400 hover:text-slate-900",
  signupAuthLink: "ml-2",
  toggler: "hidden",
  togglerMobile: "2md:flex"
}

function NavigationBar() {
  const navigate = useNavigate();

  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);

  const [showDropdown, setShowDropdown] = useMenu(profileMenuRef, profileBtnRef);

  const { isLoggedIn, user } = useSelector(loginSelector);

  const dispatch = useAppDispatch();

  return (
    <div className={`${classes.navLinks} ${classes.navLinksMobile}`}>
      <SearchRecordings className="ml-auto mr-auto" />
      <NavLink setShowDropdown={setShowDropdown} to="/" icon="home">
        Home
      </NavLink>
      <NavLink setShowDropdown={setShowDropdown} to="/record" icon="mic">
        Record
      </NavLink>
      {
        isLoggedIn && user &&
        <>
          <NavLink setShowDropdown={setShowDropdown} to="/dashboard" className="mr-0" icon="grid">
            My Dashboard
          </NavLink>
          <div className="mx-5">
            <span className="mx-2">
              <NotificationsMenu unreadNotifications={user.unreadNotifications} notifications={user.notifications} />
            </span>
          </div>
        </>
      }
      {
        isLoggedIn && user ?
          <div className="relative">
            <button ref={profileBtnRef} className="flex items-center">
              <UserImage photo={user.photo} name={user.name} />
              <span className="ml-2 text-slate-300 text-sm">{user.name.split(' ')[0]}</span>
              <svg className="h-6 w-6 fill-slate-300">
                <use xlinkHref={`${Sprite}#icon-arrow_drop_down`}></use>
              </svg>
            </button>
            {
              showDropdown &&
              <div ref={profileMenuRef} className="flex flex-col absolute right-0 py-1 mt-1 bg-slate-800 w-36 rounded-sm border border-slate-700 shadow-md">
                <NavLink setShowDropdown={setShowDropdown} to="/profile" className="text-center hover:bg-slate-700 p-3 mx-0" icon="user">
                  Profile
                </NavLink>
                <NavLink to="#" onClick={() => dispatch(logoutUser(navigate))} icon="log-out" className="text-center hover:bg-slate-700 p-3 mx-0" >
                  Logout
                </NavLink>
              </div>
            }
          </div>
          :
          <>
            <Link to="/login" className={classes.authLink}>
              Login
            </Link>
            <Link to="/signup" className={`${classes.authLink} ${classes.signupAuthLink}`}>
              Signup
            </Link>
          </>
      }
    </div >
  )
}

export default NavigationBar;