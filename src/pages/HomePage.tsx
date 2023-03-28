import React, { useEffect, useContext } from 'react'
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks/useAppDispatch';

import { fetchRecordings } from 'actions/recordings';

import Recordings from 'components/Recordings';
import PageSection from 'components/PageSection';

import { SocketContext } from 'context';
import Loader from 'components/Loader';
import ErrorView from 'components/ErrorView';

const selector = createSelector(
  [(state) => state.recordings],
  (recordings) => recordings
)

function HomePage() {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const { data, error, loading } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchRecordings());

    socket.on('new_post', () => {
      dispatch(fetchRecordings());
    });

    return () => {
      socket.off('new_post');
    }
  }, [socket]);

  if (loading) {
    return (
      <PageSection center>
        {
          loading && <Loader />
        }
      </PageSection>
    )
  }
  return (
    <PageSection className="p-2 pt-4">
      {
        error ? <ErrorView>{error}</ErrorView>
          :
          !data.length
            ? <ErrorView>There are no recordings at the moment</ErrorView>
            :
            <Recordings data={data} />
      }
    </PageSection>
  )
}

export default HomePage;