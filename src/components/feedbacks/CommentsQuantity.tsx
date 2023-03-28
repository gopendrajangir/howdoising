import React from 'react'
import Sprite from 'assets/img/sprite.svg'

function CommentsQuantity({ comments }: { comments: number }) {
  return (
    <div className="flex items-center">
      <svg className="h-5 w-5 fill-slate-700">
        <use xlinkHref={`${Sprite}#icon-comment-o`} />
      </svg>
      <div className="ml-2 text-lg text-slate-700">
        {comments}
      </div>
    </div>
  )
}

export default CommentsQuantity;