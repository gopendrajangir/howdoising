import React, { PropsWithChildren } from 'react'
import Sprite from 'assets/img/sprite.svg';

function ErrorView({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex flex-col items-center" >
      <svg className="h-12 w-12">
        <use xlinkHref={`${Sprite}#icon-alert-triangle`}></use>
      </svg>
      <span className='mt-3'>{children}</span>
    </div>
  )
}

export default ErrorView