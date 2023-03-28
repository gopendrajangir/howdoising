import PageSection from 'components/PageSection';
import React, { useEffect, useRef } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';

import PageNotFound from './PageNotFound';

interface LocationState {
  state: { fromForgotPassword?: boolean }
}

function SentResetPasswordLinkPage() {
  const { state } = useLocation() as LocationState;

  const navigate = useNavigate();

  const fromCurrent = useRef(false);

  useEffect(() => {
    if (state && state.fromForgotPassword) {
      navigate('/sentResetPasswordLink', { state: {}, replace: true });
      fromCurrent.current = true;
    }
  }, [])

  if (fromCurrent.current) {
    return (
      <PageSection center>
        <p className="bg-teal-500 p-4 w-80 rounded text-white">
          We have sent you a link on the email address you provided. You can click on the link and set new password for your account.
        </p>
      </PageSection>
    )
  } else if (state && state.fromForgotPassword && !fromCurrent.current) {
    return (
      <PageSection center>
        <ThreeDots color="#999" height={40} width={40} />
      </PageSection>
    )
  }
  return <PageNotFound />
}

export default SentResetPasswordLinkPage