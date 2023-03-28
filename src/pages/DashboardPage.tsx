import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { loginSelector } from 'selectors';

import Dashboard from 'components/Dashboard';

import PageSection from 'components/PageSection';
import NavSidebar from 'components/NavSidebar';
import { StoreState } from 'reducers';
import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchMe } from 'actions';
import Loader from 'components/Loader';
import ErrorView from 'components/ErrorView';

const selector = createSelector(
  [(state: StoreState) => state.me],
  (me) => me
)

export default () => {

  const { isLoggedIn } = useSelector(loginSelector);
  const { loading, data, error } = useSelector(selector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  const links: [string, string, string][] = [
    ['Recordings', '/dashboard/recordings', 'headset_mic'],
    ['Ratings', '/dashboard/ratings', 'star-empty'],
    ['Comments', '/dashboard/comments', 'comment-o']
  ];

  if (!isLoggedIn) {
    return <Navigate to="/" />
  } else {
    return (
      <PageSection className="!flex-row 2md:!flex-col">
        {
          loading && <Loader />
        }
        {
          error && <ErrorView>{error}</ErrorView>
        }
        {
          data &&
          <>
            <NavSidebar links={links} />
            <div className='max-h-[calc(100vh-64px)] 2md:max-h-[calc(100vh-64px-48px)] overflow-y-auto p-2 pt-4 flex-1'>
              <Dashboard data={data} />
            </div>
          </>
        }
      </PageSection>
    )
  }
}