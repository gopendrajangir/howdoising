import React, { Dispatch, SetStateAction, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logoutUser } from 'actions/auth/login';
import { loginSelector } from 'selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';

import NavLink from './NavLink';

const classes = {
  navLink: "text-slate-300 my-3 hover:text-slate-100",
  navLinkLogout: "border border-slate-300 p-3 rounded",
  navLinks: "absolute bg-slate-900 flex-col items-center flex-1 hidden self-start mt-16 w-full pb-5",
  navLinksMobile: "2md:flex",
  authLink: "border border-slate-500 text-center text-slate-400 text-sm rounded hover:border-slate-900 hover:bg-slate-400 hover:text-slate-900 mt-3 p-2.5",
}

function NavigationBar({ navRef, setShowNavigation }: { navRef: React.RefObject<HTMLDivElement>, setShowNavigation: Dispatch<SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector(loginSelector);

  const dispatch = useAppDispatch();

  return (
    <div ref={navRef} className={`${classes.navLinks} ${classes.navLinksMobile}`}>
      <NavLink setShowNavigation={setShowNavigation} to="/" className={classes.navLink} icon="home">
        Home
      </NavLink>
      <NavLink setShowNavigation={setShowNavigation} to="/record" className={classes.navLink} icon="mic">
        Record
      </NavLink>
      {
        isLoggedIn && user &&
        <NavLink setShowNavigation={setShowNavigation} to="/dashboard" className={`mr-0 ${classes.navLink}`} icon="grid">
          My Dashboard
        </NavLink>
      }
      {
        isLoggedIn && user ?
          <div className="relative">
            {
              <NavLink to="#" className={`${classes.navLink} ${classes.navLinkLogout}`} onClick={() => {
                dispatch(logoutUser(navigate));
                setShowNavigation(false);
              }} icon="log-out">
                Logout
              </NavLink>
            }
          </div>
          :
          <>
            <NavLink to="/login" className={`${classes.authLink}`} setShowNavigation={setShowNavigation}>
              Login
            </NavLink>
            <NavLink to="/signup" className={`${classes.authLink}`} setShowNavigation={setShowNavigation}>
              Signup
            </NavLink>
          </>
      }
    </div>
  )
}

export default NavigationBar;