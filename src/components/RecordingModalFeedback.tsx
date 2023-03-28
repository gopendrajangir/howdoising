import React, { useContext, useState } from 'react'

import FeedbackRatingForm from 'containers/FeedbackRatingForm';
import FeedbackCommentForm from 'containers/FeedbackCommentForm';
import AverageRating from './feedbacks/AverageRating';
import RatingsQuantity from './feedbacks/RatingsQuantity';
import CommentsQuantity from './feedbacks/CommentsQuantity';

import { api } from 'utils/apis';
import Button from './utils/Button';

import { HomeRecording } from 'actions';
import { NavigateContext } from 'context';

function RecordingFeedback({ recording }: { recording: HomeRecording }) {
  const { _id, recording: audio, user: { _id: recordingUserId }, userRated, ratingsAverage, ratingsQuantity, commentsQuantity } = recording;
  const [error, setError] = useState(null);
  const navigate = useContext(NavigateContext);

  return (
    <div className="flex flex-col items-center">
      <div className="py-3">
        <audio controls>
          <source src={`${api}/static/recordings/${audio}`} type="audio/mp3" />
        </audio>
      </div>
      <div className="w-11/12">
        {
          error &&
          <div className="w-100 text-red-600 my-1 text-sm w-100 rounded">
            {error}
          </div>
        }
        <FeedbackRatingForm recordingId={_id} recordingUserId={recordingUserId} userRated={userRated} setError={setError} />
        <FeedbackCommentForm recordingId={_id} />
        <div className="flex justify-between items-center my-3">
          <AverageRating rating={ratingsAverage} />
          <RatingsQuantity ratings={ratingsQuantity} />
          <CommentsQuantity comments={commentsQuantity} />
          <Button className="px-3 py-2" onClick={() => navigate(`/recording/${_id}`)}>See Post</Button>
        </div>
      </div>
    </div>
  )
}

export default RecordingFeedback