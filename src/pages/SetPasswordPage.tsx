import React from 'react'
import { useParams } from 'react-router-dom';

import SetPasswordForm from 'containers/SetPasswordForm';

import PageSection from 'components/PageSection';

import PageNotFound from './PageNotFound';

function SetPasswordPage() {
  const { token } = useParams();

  if (token) {
    return (
      <PageSection center>
        <SetPasswordForm token={token} />
      </PageSection>
    )
  }
  else {
    return <PageNotFound />
  }
}

export default SetPasswordPage