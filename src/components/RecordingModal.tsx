import React, { Dispatch, SetStateAction } from 'react'
import Sprite from 'assets/img/sprite.svg';

import RecordingModalFeedback from './RecordingModalFeedback';
import UserImage from 'components/UserImage';

import timeFormatter from 'utils/timeFormatter';

import { HomeRecording } from 'actions';

interface RecordingModalProps {
  setModalShow: Dispatch<SetStateAction<boolean>>,
  recording: HomeRecording
}

function RecordingModal({ setModalShow, recording }: RecordingModalProps) {
  const { title, user: { photo, name }, createdAt } = recording;
  return (
    <div className="relative bg-white rounded min-w-0 w-[400px] p-4">
      <div className="flex flex-col p-3">
        <div className="flex items-center w-full">
          <div className="flex items-center">
            <UserImage photo={photo} name={name} size="35px" />
            <span className="text-xs ml-2">
              {name.split(' ')[0]}
            </span>
          </div>
          <span className="text-xs ml-auto mr-3">
            {timeFormatter(createdAt)}
          </span>
          <button onClick={() => {
            setModalShow(false);
          }}>
            <svg className="h-5 w-5 fill-slate-600">
              <use xlinkHref={`${Sprite}#icon-close`} />
            </svg>
          </button>
        </div>
        <h6 className="flex-1 mt-2 px-3 text-center w-full truncate">
          {title}
        </h6>
      </div>
      <RecordingModalFeedback recording={recording} />
    </div >
  )
}

export default RecordingModal