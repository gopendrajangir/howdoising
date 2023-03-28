import styled from "styled-components"

import NotificationUser from './NotificationUser'

export const NotificationWrapper = styled.button`
  color: #444;
  border: none;
  text-align: start;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 8px;
  padding-left: 2px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
  position: relative;
`

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  flex: 1;
  min-width: 0;
  `

export const LoggedInUser = styled(NotificationUser).attrs({
  as: 'div'
})

export const NotificationText = styled.p`
  height: 38px;
  font-size: 11px;
  margin-top: 5px;
  // white-space: wrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  `

export const Title = styled.h6`

  font-size: 13px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
`

export const NotificationDate = styled.span`
  font-size: 10px;
  position: absolute;
  top: 2px;
  right: 5px;
`
