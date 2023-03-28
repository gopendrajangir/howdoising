import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import FeedbackRatingForm from 'containers/FeedbackRatingForm';
import FeedbackCommentForm from 'containers/FeedbackCommentForm';
import Ratings from 'containers/Feedbacks/Ratings';
import Comments from 'containers/Feedbacks/Comments';
import UserImage from './UserImage';

import { Recording } from 'actions';

import timeFormatter from 'utils/timeFormatter';
import { api } from 'utils/apis';
import { loginSelector } from 'selectors';

function RecordingContent({ data }: { data: Recording }) {
  const { _id, title, recording: audio, description, user: recordingUser, ratings, comments, createdAt } = data;
  const [recordingError, setRecordingError] = useState(null);
  const [userRated, setUserRated] = useState<number | false>(false);

  const { user } = useSelector(loginSelector);

  useEffect(() => {
    let userRatings = ratings.filter((item) => {
      if (user) {
        return item.user._id === user._id
      } else {
        return false
      }
    }).map((item) => {
      const rating: any = { ...item };
      rating.user = rating.user._id
      return rating;
    });

    let userRated = userRatings.length ? userRatings[0].rating : false;
    setUserRated(userRated);
  }, [ratings, user]);

  return (
    <div className="flex flex-col md:flex-row md:items-start flex-wrap">
      <div className="w-100 md:w-2/3 lg:w-1/2 flex flex-col p-8 pb-0">
        <div className="w-100 flex justify-between items-center">
          <div className="flex items-center">
            <UserImage photo={recordingUser.photo} name={recordingUser.name} />
            <div className="text-xs ml-1">{recordingUser.name.split(' ')[0]}</div>
          </div>
          <div className='text-xs'>{timeFormatter(createdAt)}</div>
        </div>
        <div className="my-3 text-center">{title}</div>
        <div className="my-2 text-sm text-center">{description}</div>
        <div className="flex justify-center my-4">
          <audio controls key={_id}>
            <source src={`${api}/static/recordings/${audio}`} type="audio/mp3" />
          </audio>
        </div>
        <p className="text-sm text-red-500">{recordingError}</p>
        <FeedbackRatingForm recordingId={data._id} recordingUserId={recordingUser._id} userRated={userRated} setError={setRecordingError} />
        <FeedbackCommentForm recordingId={_id} />
      </div>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto md:w-1/3 lg:w-1/4 p-4">
        <Ratings ratings={ratings} />
      </div>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto lg:w-1/4 p-4">
        <Comments comments={comments} recordingUserId={recordingUser._id} />
      </div>
    </div>
  )
}

export default RecordingContent