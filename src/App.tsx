import React, { useEffect, useContext, useRef, MutableRefObject, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from 'pages/HomePage';
import SearchPage from 'pages/SearchPage';
import RecordPage from 'pages/RecordPage';
import RecordingPage from 'pages/RecordingPage';
import UserPage from 'pages/UserPage';
import ProfilePage from 'pages/ProfilePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import SetPasswordPage from 'pages/SetPasswordPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import SentEmailVerificationLinkPage from 'pages/SentEmailVerificationLinkPage';
import SentResetPasswordLinkPage from 'pages/SentResetPasswordLinkPage';
import DashboardPage from 'pages/DashboardPage';

import NavigationBar from 'containers/NavigationBar';
import MessageBox from 'containers/MessageBox';
import LoadingModal from 'containers/LoadingModal';

import PageNotFound from 'pages/PageNotFound';

import { NavigateContext, SocketContext } from './context';

import { fetchUserNotifications } from 'actions/notifications';
import { syncWithApi } from 'actions/auth/login';

import { loginSelector } from 'selectors';

import { useAppDispatch } from 'hooks/useAppDispatch';

function App() {

  const login = useSelector(loginSelector);

  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const navigator = useCallback((to: string) => {
    navigate(to);
  }, [])

  const { isLoggedIn, user } = login;

  const dispatch = useAppDispatch()

  const roomId: MutableRefObject<string> = useRef("");

  useEffect(() => {
    dispatch(syncWithApi());
  }, []);

  useEffect(() => {
    dispatch(fetchUserNotifications());
  }, []);

  useEffect(() => {
    if (isLoggedIn && user) {
      roomId.current = user._id;
      socket.emit('join', user._id, (err: any) => {
        console.log(err);
      })
      socket.on('notification', () => {
        dispatch(fetchUserNotifications());
      })
    }

    return () => {
      socket.off('notification');
      socket.emit('leave', roomId.current, (err: any) => {
        console.log(err);
      })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {
      socket.close()
    };
  }, [socket]);

  return (
    <div>
      <NavigateContext.Provider value={navigator}>
        <MessageBox />
        <LoadingModal />
        <NavigationBar />
        <div className="page-section">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search/:query' element={<SearchPage />} />
            <Route path='/record' element={<RecordPage />} />
            <Route path='/recording/:id' element={<RecordingPage />} />
            <Route path='/user/:id' element={<UserPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/setPassword/:token' element={<SetPasswordPage />} />
            <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
            <Route path='/resetPassword/:token' element={<ResetPasswordPage />} />
            <Route path='/sentEmailVerificationLink' element={<SentEmailVerificationLinkPage />} />
            <Route path='/sentResetPasswordLink' element={<SentResetPasswordLinkPage />} />
            <Route path='/profile/*' element={<ProfilePage />} />
            <Route path='/dashboard/*' element={<DashboardPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </NavigateContext.Provider>
    </div>
  );
}

const RouterComponent = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default RouterComponent;
