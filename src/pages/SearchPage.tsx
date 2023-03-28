import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { StoreState } from 'reducers';

import { searchRecordings } from 'actions/search';

import Recordings from 'components/Recordings';
import PageSection from 'components/PageSection';
import { useAppDispatch } from 'hooks/useAppDispatch';
import ErrorView from 'components/ErrorView';
import Loader from 'components/Loader';

const selector = createSelector(
  [(state: StoreState) => state.search],
  (search) => search
);

function SearchPage() {
  const { query } = useParams()
  const { data, error, loading } = useSelector(selector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query) {
      dispatch(searchRecordings(query));
    }
  }, [query]);

  if (!query || loading || error) {
    return (
      <PageSection center>
        {
          !query && <ErrorView>Recordings not found</ErrorView>
        }
        {
          !loading && <Loader />
        }
        {
          error && <ErrorView>{error}</ErrorView>
        }
      </PageSection>
    )
  }
  return (
    <PageSection>
      {
        !data.length ? <ErrorView>No recordings found matching {query}</ErrorView>
          :
          <PageSection>
            <h1 className='p-4 text-[24px] border-b mb-2 font-medium'>Results for - {query}</h1>
            <Recordings data={data} />
          </PageSection>
      }
    </PageSection>
  )
}

export default SearchPage;