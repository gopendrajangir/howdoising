import React from 'react'

import NotificationUser from './NotificationUser'
import { NotificationWrapper, NotificationContent, NotificationText, Title, NotificationDate } from './NotificationStyled';

import timeFormatter from 'utils/timeFormatter'
import { useNavigate } from 'react-router-dom';
import { CommentNotification } from 'actions';

function CommentNotificationComponent({ item, createdAt }: { item: CommentNotification, createdAt: Date }) {
  const navigate = useNavigate();

  return (
    <NotificationWrapper onClick={() => {
      navigate(`recording/${item.recording._id}`)
    }}>
      <NotificationUser photo={item.user.photo} name={item.user.name} id={item.user._id} />
      <NotificationContent>
        <Title>{item.recording.title}</Title>
        <NotificationText>{item.user.name} commented on your post "{item.textComment}".</NotificationText>
      </NotificationContent>
      <NotificationDate>{timeFormatter(createdAt)}</NotificationDate>
    </NotificationWrapper>
  )
}

export default CommentNotificationComponent;