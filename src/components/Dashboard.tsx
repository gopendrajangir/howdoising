import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { HomeRecording, UserMe } from 'actions';

import Recordings from 'components/Recordings';

import PageNotFound from 'pages/PageNotFound';
import ComponentTodo from './ComponentTodo';

const RecordingsWrapper = ({ data }: { data: HomeRecording[] }) => {
  if (!data.length) {
    return <h1>You have not posted any recording yet</h1>
  } else {
    return <Recordings data={data} />
  }
}


// const RatingsWrapper = ({ data }: { data: UserMeRating[] }) => {
//   if (!data.length) {
//     return <h1>You have not rated any post</h1>
//   } else {
//     return <UserMeRatings data={data} />
//   }
// }

// const CommentsWrapper = ({ data }: { data: UserMeRating[] }) => {
//   if (!data.length) {
//     return <h1>You have not rated any post</h1>
//   } else {
//     return <UserMeComments data={data} />
//   }
// }

function Dashboard({ data }: { data: UserMe }) {
  return (
    <Routes>
      <Route path="/recordings" element={<RecordingsWrapper data={data.recordings} />} />
      <Route path="/comments" element={<ComponentTodo />} />
      <Route path="/ratings" element={<ComponentTodo />} />
      <Route path="*" element={<Navigate to="recordings" />} />
    </Routes>
  )
}

export default Dashboard;