import React from 'react'

import Sprite from 'assets/img/sprite.svg';

import RatingCard from './RatingCard';
import { LoggedInUser, Rating } from 'actions';


function Ratings({ ratings }: { ratings: Rating[] }) {
  return (
    <>
      <div className='mb-5 flex item-center'>
        <svg className="w-5 h-5 min-w-5 mr-2 fill-slate-700">
          <use xlinkHref={`${Sprite}#icon-star-full`} />
        </svg>
        <h6 className="text-sm">Ratings ({ratings.length})</h6>
      </div>
      {
        ratings.length ?
          <div className="w-full flex flex-wrap">
            {
              ratings.map((item, i) => {
                return (
                  <RatingCard key={item._id} item={item} />
                )
              })
            }
          </div>
          :
          <span className="text-sm text-slate-400 self-center mt-32">No Ratings</span>
      }
    </>
  )
}

export default Ratings