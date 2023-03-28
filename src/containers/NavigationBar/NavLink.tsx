import React, { Dispatch, SetStateAction } from 'react';
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

import Sprite from 'assets/img/sprite.svg';

interface NavLinkProps extends PropsWithChildren {
  to: string;
  className?: string;
  icon?: string;
  setShowDropdown?: Dispatch<SetStateAction<boolean>>;
  setShowNavigation?: Dispatch<SetStateAction<boolean>>;
  onClick?: Function;
}

const NavLink = ({ children, to, className, icon, setShowDropdown, setShowNavigation, onClick }: NavLinkProps) => {

  const { pathname: route } = useLocation();

  return (
    <Link to={to}

      onClick={() => {
        if (setShowDropdown) {
          setShowDropdown(false);
        }
        if (setShowNavigation) {
          setShowNavigation(false);
        }
        if (onClick) {
          onClick();
        }
      }}
      className={`flex items-center justify-center text-slate-300 fill-slate-300 hover:fill-slate-100 mx-3 hover:text-slate-100 ${className}  ${route === to || to.split('/').reverse()[0] === route.split('/')[1] ? "!text-cyan-500 !fill-cyan-500" : ""}`}>
      {
        icon &&
        <svg className="h-4 w-4 fill-inherit mr-2">
          <use xlinkHref={`${Sprite}#icon-${icon}`} />
        </svg>
      }
      <span className="text-base">{children}</span>
    </Link>
  );
}

export default NavLink;