import React from 'react'

import { HomeRecording } from 'actions';

import RecordingCard from 'components/RecordingCard';

function Recordings({ data }: { data: HomeRecording[] }) {
  console.log("Recordings");
  return (
    <div className="w-full flex flex-wrap">
      {
        data.map((recording, index) => {
          return <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4" key={recording._id}><RecordingCard recording={recording} index={index} /></div>
        })
      }
    </div>
  )
}

export default React.memo(Recordings);