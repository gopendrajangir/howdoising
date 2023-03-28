import React from 'react'

import { NotificationWrapper, NotificationContent, NotificationText, Title, NotificationDate } from './NotificationStyled';
import NotificationUser from './NotificationUser'

import timeFormatter from 'utils/timeFormatter'
import { useNavigate } from 'react-router-dom';
import { AnswerNotification } from 'actions';

function AnswerNotificationComponent({ item, createdAt }: { item: AnswerNotification, createdAt: Date }) {
  const navigate = useNavigate();
  return (
    <NotificationWrapper onClick={() => {
      navigate(`qna/${item.question._id}`);
    }}>
      <NotificationUser photo={item.user.photo} name={item.user.name} id={item.user._id} />
      <NotificationContent>
        <Title>{item.question.title}</Title>
        <NotificationText>{item.user.name} answered your question "{item.textAnswer}".</NotificationText>
      </NotificationContent>
      <NotificationDate>{timeFormatter(createdAt)}</NotificationDate>
    </NotificationWrapper>
  )
}

export default AnswerNotificationComponent;