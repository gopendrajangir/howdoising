import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

import NotificationCard from './NotificationCard';

import Sprite from 'assets/img/sprite.svg';

import useMenu from 'hooks/useMenu';

import { readAllNotifications } from 'actions';
import { Notification } from 'actions';
import { useAppDispatch } from 'hooks/useAppDispatch';

const NotificationCount = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  top: -4px;
  right: -8px;
  background-color: #ff3031;
  color: #fff;
`

const NotificationsWrapper = styled.div`
  width: 350px;
  height: 450px;
  position: absolute;
  top: 25px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 2px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    position: fixed !important;
    top: 55px;
    right: 10px;
    z-index: 10;
  }
`

const NotificationsHeader = styled.h6`
  padding: 18px;
  color: #444;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 4;
  background-color: #fff;
  font-size: 13px;
  border-bottom: 1px solid #eee;
`

const Notifications = styled.div`
  margin-top: 51px;
  height: 400px;
  padding: 5px 5px;
  padding-bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const NoNotification = styled.div`
  justify-self: center;
  align-self: center;
  margin-top: 160px;
  color: #aaa;
`

interface NotificationsMenuProps {
  unreadNotifications: number,
  notifications: Notification[],
}

function NotificationsMenu({ unreadNotifications, notifications }: NotificationsMenuProps) {
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const [show] = useMenu(menuRef, btnRef);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (show) {
      dispatch(readAllNotifications());
    }
  }, [show]);

  return (
    <div className="relative">
      <button ref={btnRef} className="py-1">
        <svg className="h-5 w-5 fill-slate-300">
          <use xlinkHref={`${Sprite}#icon-bell`} />
        </svg>
        {
          unreadNotifications > 0 ?
            unreadNotifications > 9 ?
              <NotificationCount>9+</NotificationCount>
              :
              <NotificationCount>{unreadNotifications}</NotificationCount>
            : null
        }
      </button>
      {
        show &&
        <NotificationsWrapper ref={menuRef} className="shadow-lg">
          <NotificationsHeader className='flex justify-center'>
            <svg className="h-5 w-5 fill-slate-500 mr-2">
              <use xlinkHref={`${Sprite}#icon-bell`} />
            </svg>
            Notifications ({notifications.length})
          </NotificationsHeader>
          <Notifications>
            {
              notifications.length ?
                [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((item: Notification, i: number) => {
                  return (
                    <NotificationCard btnRef={btnRef} key={i + new Date().getTime()} item={item} />
                  )
                })
                :
                <NoNotification>No Notifications!</NoNotification>
            }
          </Notifications>
        </NotificationsWrapper>
      }
    </div>
  )
}

export default NotificationsMenu;