import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import PageSection from 'components/PageSection';

import PageNotFound from './PageNotFound';
import { ThreeDots } from 'react-loader-spinner';

interface LocationState {
  state: {
    fromSignup?: true
  }
}

function SentEmailVerificationLinkPage() {
  const { state } = useLocation() as LocationState;
  const navigate = useNavigate();
  const fromCurrent = useRef(false);

  useEffect(() => {
    if (state && state.fromSignup) {
      navigate('/sentEmailVerificationLink', { state: {}, replace: true });
      fromCurrent.current = true;
    }
  }, [])

  if (fromCurrent.current) {
    return (
      <PageSection center>
        <p className="bg-teal-500 p-4 w-80 rounded text-white">
          We have sent you a link on the email address you provided. You can click on the link and set your password.
        </p>
      </PageSection>
    )
  } else if (state && state.fromSignup && !fromCurrent.current) {
    return (
      <PageSection center>
        <ThreeDots color="#999" height={40} width={40} />
      </PageSection>
    )
  } else {
    return <PageNotFound />
  }
}

export default SentEmailVerificationLinkPage