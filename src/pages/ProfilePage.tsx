import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { loginSelector } from 'selectors';

import BasicInfo from 'containers/Profile/BasicInfo';
import ChangePassword from 'containers/Profile/ChangePassword';
import PageSection from 'components/PageSection';
import PageNotFound from './PageNotFound';
import NavSidebar from 'components/NavSidebar';

export default () => {

  const { user } = useSelector(loginSelector);

  const links: [string, string, string][] = [
    ['Basic Profile', '/profile/basic', 'user'],
    ['Change Password', '/profile/password', 'key']
  ];

  if (user) {
    return (
      <PageSection className="!flex-row 2md:!flex-col">
        <NavSidebar links={links} />
        <div className='max-h-[calc(100vh-64px)] 2md:max-h-[calc(100vh-64px-48px)] overflow-y-auto flex flex-1 justify-center items-center'>
          <Routes>
            <Route path="/basic" element={<BasicInfo user={user} />} />
            <Route path="/password" element={<ChangePassword user={user} />} />
            <Route path="*" element={<Navigate to="basic" />} />
          </Routes>
        </div>
      </PageSection>
    )
  } else {
    return <Navigate to="/login" />
  }
}
