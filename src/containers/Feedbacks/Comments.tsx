import React from 'react'

import CommentCard from './CommentCard';

import Sprite from 'assets/img/sprite.svg';
import { Comment } from 'actions';

interface CommentsProps {
  comments: Comment[],
  recordingUserId: string
}

function Comments({ comments, recordingUserId }: CommentsProps) {
  return (
    <>
      <div className='mb-5 flex item-center'>
        <svg className="w-5 h-5 min-w-5 mr-2 fill-slate-700">
          <use xlinkHref={`${Sprite}#icon-bubble`} />
        </svg>
        <h6 className="text-sm">Comments ({comments.length})</h6>
      </div>
      {
        comments.length ?
          <div className="w-full flex flex-wrap">
            {
              comments.map((item, i) => {
                return (
                  <CommentCard key={item._id} item={item} recordingUserId={recordingUserId} />
                )
              })
            }</div>
          :
          <span className="text-sm text-slate-400 mt-auto mb-auto self-center mt-32">No Comments</span>
      }
    </>
  )
}

export default Comments;