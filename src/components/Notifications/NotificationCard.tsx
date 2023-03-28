import React from 'react'

import CommentNotification from './CommentNotification';
import RatingNotification from './RatingNotification';
import AnswerNotification from './AnswerNotification';

import { Notification } from 'actions';

function NotificationCard({ item, btnRef }: { item: Notification, btnRef: React.RefObject<HTMLButtonElement> }) {
  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column', marginBottom: '5px'
    }}
      onClick={() => {
        btnRef.current?.click();
      }}
    >
      {
        item.rating ?
          <RatingNotification item={item['rating']} createdAt={item.createdAt} />
          :
          item.comment ?
            <CommentNotification item={item['comment']} createdAt={item.createdAt} />
            :
            item.answer ?
              <AnswerNotification item={item['answer']} createdAt={item.createdAt} />
              : null
      }
    </div >
  )
}

export default NotificationCard