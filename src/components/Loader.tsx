import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="m-auto">
      <ThreeDots color="#333" height={120} width={120} />
    </div>
  )
}

export default Loader