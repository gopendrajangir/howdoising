import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { fetchRecording } from 'actions/recording';
import { StoreState } from 'reducers';

import RecordingContent from 'components/RecordingContent';
import { useAppDispatch } from 'hooks/useAppDispatch';
import PageSection from 'components/PageSection';
import Loader from 'components/Loader';
import ErrorView from 'components/ErrorView';

const selector = createSelector(
  [(state: StoreState) => state.recording],
  (recording) => recording
)

function RecordingPage(
) {
  const { id } = useParams();

  const { data, error, loading } = useSelector(selector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchRecording(id));
    }
  }, [id])

  if (loading || error) {
    return (
      <PageSection center>
        {
          loading && <Loader />
        }
        {
          error && <ErrorView>{error}</ErrorView>
        }
      </PageSection>
    )
  }
  return (
    <>
      {
        data && <RecordingContent data={data!} />
      }
    </>
  )
}

export default RecordingPage;