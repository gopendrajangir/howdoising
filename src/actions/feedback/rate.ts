import { Dispatch } from 'redux';
import Axios from 'axios';

import { api } from 'utils/apis';

import { HomeRecording, Recording, MessageTypes, Rating, RatingRequestBody } from '../types';
import { setMessageSuccess, SetMessageAction } from '../message';
import { FetchRecordingsSuccessAction, fetchRecordingsSuccess } from '../recordings';
import { FetchRecordingSuccessAction, fetchRecordingSuccess } from '../recording';

import { StoreState } from 'reducers';

function updateHomeRatings(dispatch: Dispatch, recordings: HomeRecording[], recordingId: string, ratingValue: number) {
  const newRecordings = recordings.map((item: HomeRecording): HomeRecording => {
    if (item._id === recordingId) {
      const recording: HomeRecording = { ...item };
      if (recording.userRated) {
        recording.ratingsAverage = ratingValue / recording.ratingsQuantity + ((recording.ratingsAverage - recording.userRated / recording.ratingsQuantity) * recording.ratingsQuantity);
      } else {
        recording.ratingsAverage = (recording.ratingsAverage * recording.ratingsQuantity + ratingValue) / (recording.ratingsQuantity + 1)
        recording.ratingsQuantity += 1;
      }
      recording.userRated = ratingValue;
      return recording;
    }
    return item;
  })

  dispatch<FetchRecordingsSuccessAction>(fetchRecordingsSuccess(newRecordings));
}

export const rateRecording = (recordingId: string, data: RatingRequestBody, setIsRating: (flag: boolean) => void, ratingLocation: string) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      const response = await Axios.post(`${api}/recordings/${recordingId}/ratings`, data, { withCredentials: true, });

      if (response && response.data && response.data.data) {

        const rating = response.data.data;
        const { recording: { data: recording }, login: { user }, recordings: { data: recordings } }: StoreState = JSON.parse(JSON.stringify(getState()));

        if (ratingLocation === '/') {
          updateHomeRatings(dispatch, recordings, recordingId, rating.rating);
        } else if (ratingLocation === '/recording') {

          if (recording && user) {
            if (recording._id === rating.recording) {
              const newRecording: Recording = { ...recording };

              const ratingExist = newRecording.ratings.filter((item: Rating): boolean => {
                return item._id === rating._id
              }).length ? true : false;

              if (ratingExist) {
                newRecording.ratings = newRecording.ratings.map((item: Rating): Rating => {
                  if (item._id === rating._id) {
                    newRecording.ratingsAverage = (rating.rating + ((newRecording.ratingsAverage * newRecording.ratingsQuantity) - item.rating)) / newRecording.ratingsQuantity;
                    item.rating = rating.rating;
                  }
                  return { ...item };
                })
              } else {
                const newRating: Rating = {
                  ...rating,
                  user: {
                    _id: rating.user,
                    name: user.name,
                    photo: user.photo,
                    id: rating.user
                  }
                }
                newRecording.ratings.unshift(newRating);
                newRecording.ratingsAverage = (rating.rating + (newRecording.ratingsAverage * newRecording.ratingsQuantity)) / (newRecording.ratingsQuantity + 1);
                newRecording.ratingsQuantity += 1;
              }

              dispatch<FetchRecordingSuccessAction>(fetchRecordingSuccess(newRecording));

              updateHomeRatings(dispatch, recordings, recordingId, rating.rating);
            }
          }
        }

        dispatch<SetMessageAction>(setMessageSuccess("Recording rated!", MessageTypes.success));
        setIsRating(false);
      }
    } catch (err: any) {
      setIsRating(false);
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  };
};

export const deleteRating = (recordingId: string, ratingId: string, setDeletingRating: (flag: boolean) => void) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      await Axios.delete(`${api}/recordings/${recordingId}/ratings/${ratingId}`, { withCredentials: true, })
      const { recording: { data: recording }, recordings: { data: recordings } }: StoreState = JSON.parse(JSON.stringify(getState()));

      if (recording) {

        const { ratings } = recording;

        let oldRating = 0;

        const newRatings = ratings.filter((item: Rating) => {
          if (item._id === ratingId) {
            oldRating = item.rating;
            return false;
          }
          return true;
        })
        const newRecording: Recording = { ...recording };
        newRecording.ratings = newRatings;

        if (newRecording.ratingsQuantity - 1 !== 0) {
          newRecording.ratingsAverage = (newRecording.ratingsAverage * newRecording.ratingsQuantity - oldRating) / (newRecording.ratingsQuantity - 1);
        } else {
          newRecording.ratingsAverage = 10;
        }
        newRecording.ratingsQuantity -= 1;

        setDeletingRating(false);
        dispatch<FetchRecordingSuccessAction>(fetchRecordingSuccess(newRecording));

        const newRecordings = recordings.map((item: HomeRecording): HomeRecording => {
          if (item.userRated) {
            if (item.ratingsQuantity - 1 !== 0) {
              item.ratingsAverage = (item.ratingsAverage * item.ratingsQuantity - oldRating) / (item.ratingsQuantity - 1);
            } else {
              item.ratingsAverage = 10;
            }
            item.ratingsQuantity -= 1;
            item.userRated = false;
          }
          return item;
        });

        dispatch<FetchRecordingsSuccessAction>(fetchRecordingsSuccess(newRecordings));

        dispatch<SetMessageAction>(setMessageSuccess("Rating Deleted!", MessageTypes.success));
      }
    } catch (err: any) {
      setDeletingRating(false);
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  };
};
