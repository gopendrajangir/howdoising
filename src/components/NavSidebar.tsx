import NavLink from 'containers/NavigationBar/NavLink';
import React from 'react'
import { Link } from 'react-router-dom';

interface NavSidebarProps {
  links: [string, string, string][];
}

function NavSidebar({ links }: NavSidebarProps) {
  return (
    <div className='flex flex-col bg-slate-900 border-t border-t-slate-800 pt-5 2md:flex-row 2md:pt-0 2md:h-12'>
      {
        links.map((link: [string, string, string]) => {
          return <NavLink key={link[0]} className='w-52 2md:min-w-0 hover:bg-slate-800 !m-0 p-4 pl-6 2md:p-2 !justify-start 2md:!justify-center' to={link[1]} icon={link[2]}>{link[0]}</NavLink>
        })
      }
    </div>
  )
}

export default NavSidebar