import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoginForm from 'containers/LoginForm';

import { loginSelector } from 'selectors';
import PageSection from 'components/PageSection';

export default () => {
  const { isLoggedIn } = useSelector(loginSelector);

  if (!isLoggedIn) {
    return (
      <PageSection center>
        <LoginForm />
      </PageSection>
    )
  } else {
    return <Navigate to="/" />
  }
}