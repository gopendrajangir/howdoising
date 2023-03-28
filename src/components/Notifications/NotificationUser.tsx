import React from 'react'
import styled from 'styled-components'
import UserImage from 'components/UserImage'

const UserWrapper = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #444;
  min-width: 0;
  widtH: 70px;
`

const NotificationUserImage = styled(UserImage)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const UserName = styled.h6`
  margin-top: 8px;
  font-size: 11px;
  line-height: 11px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

interface NotificationUserProps {
  photo: string;
  name: string;
  id: string;
}

function NotificationUser({ photo, name, id }: NotificationUserProps) {
  return (
    <UserWrapper>
      <NotificationUserImage photo={photo} name={name} />
      <UserName>{name.split(' ')[0]}</UserName>
    </UserWrapper>
  )
}

export default NotificationUser