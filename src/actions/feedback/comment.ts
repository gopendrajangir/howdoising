import { Dispatch } from 'redux';
import Axios from 'axios';

import { HomeRecording, Recording, MessageTypes, Comment } from '../types';

import { api } from 'utils/apis';

import { setMessageSuccess, SetMessageAction } from '../message';
import { FetchRecordingsSuccessAction, fetchRecordingsSuccess } from '../recordings';
import { FetchRecordingSuccessAction, fetchRecordingSuccess } from '../recording';

import { StoreState } from 'reducers';

function updateHomeComments(dispatch: Dispatch, recordings: HomeRecording[], commentRecordingId: string) {
  const newRecordings = recordings.map((item: HomeRecording): HomeRecording => {
    if (item._id === commentRecordingId) {
      item.commentsQuantity += 1;
      item.userCommented = true;
    }
    return item;
  })
  dispatch<FetchRecordingsSuccessAction>(fetchRecordingsSuccess(newRecordings))
}

export const commentRecording = (recordingId: string, data: FormData, setIsCommenting: (flag: boolean) => void, commentLocation: string) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      const response = await Axios({
        method: "post",
        url: `${api}/recordings/${recordingId}/comments`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if (response && response.data && response.data.data) {

        const comment = response.data.data;

        const { recordings: { data: recordings }, login: { user }, recording: { data: recording } }: StoreState = JSON.parse(JSON.stringify(getState()));

        if (commentLocation === '/') {
          updateHomeComments(dispatch, recordings, comment.recording);
        }

        if (commentLocation === '/recording' && recording && user) {
          recording.commentsQuantity += 1;

          const newComment: Comment = {
            ...comment,
            user: {
              _id: comment.user,
              name: user.name,
              photo: user.photo,
              id: comment.user
            }
          }

          recording.comments.unshift(newComment)

          const newRecording: Recording = { ...recording };

          dispatch<FetchRecordingSuccessAction>(fetchRecordingSuccess(newRecording));

          updateHomeComments(dispatch, recordings, comment);
        }
        setIsCommenting(false);
        dispatch<SetMessageAction>(setMessageSuccess("Recording commented!", MessageTypes.success));
      }
    } catch (err: any) {
      setIsCommenting(false);
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  };
};

export const deleteComment = (recordingId: string, commentId: string, setDeletingComment: (flag: boolean) => void) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      await Axios.delete(`${api}/recordings/${recordingId}/comments/${commentId}`, { withCredentials: true, })
      const { recording: { data: recording }, recordings: { data: recordings } }: StoreState = JSON.parse(JSON.stringify(getState()));

      if (recording) {
        const { comments } = recording;
        const newComments = comments.filter((item: Recording["comments"][0]) => {
          return item._id !== commentId;
        })
        const newRecording: Recording = { ...recording };
        newRecording.comments = newComments;
        newRecording.commentsQuantity -= 1;
        dispatch<FetchRecordingSuccessAction>(fetchRecordingSuccess(newRecording));

        const newRecordings = recordings.map((item: HomeRecording) => {
          if (item._id === recordingId) {
            item.commentsQuantity -= 1;
            item.userCommented = false;
          }
          return item;
        })
        dispatch<FetchRecordingsSuccessAction>(fetchRecordingsSuccess(newRecordings))

        setDeletingComment(false);
        dispatch<SetMessageAction>(setMessageSuccess("Comment Deleted!", MessageTypes.success));
      }
    } catch (err: any) {
      setDeletingComment(false);
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  };
};
