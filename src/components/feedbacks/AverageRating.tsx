import React from 'react'

function AverageRating({ rating }: { rating: number }) {
  return (
    <div className='flex flex-col content-center items-center'>
      <span className="text-lg text-stone-700">{rating}</span>
      <span className="text-xs font-medium text-stone-700">Rating</span>
    </div>
  )
}

export default AverageRating;