import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'

import { loginSelector } from 'selectors'

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

function LoadingModal() {
  const { isLoggingOut } = useSelector(loginSelector);

  if (isLoggingOut) {
    return (
      <div className='h-screen w-screen bg-zinc-900/50 z-[10000] fixed flex justify-center items-center'>
        <ThreeDots color='#eee' height={120} width={120} />
      </div>
    );
  } else {
    return null
  }
}

export default LoadingModal