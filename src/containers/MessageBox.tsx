import React from 'react'
import { connect } from 'react-redux';
import { setMessage } from 'actions/message';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% { top: -100px }
  100% { top: 10px }
`

const Box = styled.div`
  position: fixed;
  top: 10px;
  z-index: 100000;
  width: 350px;
  border-radius: 2px;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 12px 15px;
  font-size: 14px;
  box-shadow: 0 0 5px #222;
  animation-name: ${slideDown};
  animation-duration: .1s;
`;

function MessageBox({ message, setMessage, type }: { message: string | null, setMessage: Function, type: String | null }) {
  if (message) {
    setTimeout(() => {
      setMessage(null, null);
    }, 5000);
  }

  return (
    <div>
      {
        message &&
        <Box className={`${type === "danger" ? "bg-red-500" : "bg-green-600"} text-white`}>
          {message}
        </Box>

      }
    </div>
  )
}

const mapStateToProps = (state: { message: { message: string | null, type: string | null } }) => {
  return {
    message: state.message.message,
    type: state.message.type
  }
}

const mapActionsToProps = {
  setMessage
}

export default connect(mapStateToProps, mapActionsToProps)(MessageBox);