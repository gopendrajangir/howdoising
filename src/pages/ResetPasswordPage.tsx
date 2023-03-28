import React from 'react'
import { useParams } from 'react-router-dom';

import ResetPasswordForm from 'containers/ResetPasswordForm'

import PageSection from 'components/PageSection';

import PageNotFound from './PageNotFound';

function ResetPasswordPage() {
  const { token } = useParams();

  if (token)
    return (
      <PageSection center>
        <ResetPasswordForm token={token} />
      </PageSection>
    )
  else
    return <PageNotFound />
}

export default ResetPasswordPage