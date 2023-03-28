import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import UserImage from 'components/UserImage';
import Menu from 'components/Menu';

import { deleteComment } from 'actions/feedback/comment';

import timeFormatter from 'utils/timeFormatter';
import { colors } from 'utils/colors';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { Comment, LoggedInUser } from 'actions';
import { loginSelector } from 'selectors';
import { useSelector } from 'react-redux';

const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
  padding: 10px;
  border-radius: 4px;
  min-width: 0;
  width: 100%;
  position: relative;
`

const FeedbackUserWrapper = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #444;
`

const FeedbackUserName = styled.h6`
  font-size: 12px;
  line-height: 12px;
  text-align: start;
  
  margin-left: 10px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CommentText = styled.p`
  padding: 0;
  font-size: 13px;
  color: #444;
  
  margin-top: 10px;
  margin-left: 5px;
`

const DropdownMenu = styled(Menu)`
  position: absolute;
  right: 5px;
  top: 3px;
  margin: 5px;
  `

const DeletingCommentWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`

const Time = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: #444;
  text-align: center;
  position: absolute;
  right: 28px;
  top: 17px;
`

interface CommentProps {
  item: Comment,
  recordingUserId: string
}

function CommentCard({ item, recordingUserId }: CommentProps) {
  const [deletingComment, setDeletingComment] = useState(false);

  const { user } = useSelector(loginSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setDeletingComment(false);
    }
  }, [])

  return (
    <CommentCardWrapper key={item._id} bgColor={colors.gold}>
      <FeedbackUserWrapper>
        <UserImage photo={item.user.photo} name={item.user.name} size="45px" />
        <FeedbackUserName>{item.user.name.split(' ')[0]}</FeedbackUserName>
      </FeedbackUserWrapper>
      <Time>{timeFormatter(item.createdAt)}</Time>
      <CommentText>{item.textComment}</CommentText>
      {
        ((user && item.user._id === user._id) || (user && recordingUserId === user._id)) &&
        <DropdownMenu items={[['Delete Comment', () => {
          setDeletingComment(true);
          dispatch(deleteComment(item.recording, item._id, setDeletingComment));
        }]]
        } />
      }
      {
        deletingComment &&
        <DeletingCommentWrapper>
          Deleting Comment...
        </DeletingCommentWrapper>
      }
    </CommentCardWrapper>
  )
}

export default CommentCard;