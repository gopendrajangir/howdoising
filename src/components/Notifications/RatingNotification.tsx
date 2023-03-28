import React from 'react'

import NotificationUser from './NotificationUser'
import { useNavigate } from 'react-router-dom'

import timeFormatter from 'utils/timeFormatter'

import { NotificationWrapper, NotificationContent, NotificationText, Title, NotificationDate } from './NotificationStyled';
import { RatingNotification } from 'actions'

function RatingNotificationComponent({ item, createdAt }: { item: RatingNotification, createdAt: Date }) {
  const navigate = useNavigate();
  return (
    <NotificationWrapper onClick={() => {
      navigate(`/recording/${item.recording._id}`)
    }}>
      <NotificationUser photo={item.user.photo} name={item.user.name} id={item.user._id} />
      <NotificationContent>
        <Title>{item.recording.title}</Title>
        <NotificationText>{item.user.name} rated ({item.rating}) your post.</NotificationText>
      </NotificationContent>
      <NotificationDate>{timeFormatter(createdAt)}</NotificationDate>
    </NotificationWrapper>
  )
}

export default RatingNotificationComponent;