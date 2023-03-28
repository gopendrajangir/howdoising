import React, { useState } from 'react'
import styled from 'styled-components';

import UserImage from 'components/UserImage';
import Menu from 'components/Menu';

import timeFormatter from 'utils/timeFormatter';
import { colors } from 'utils/colors';

import { deleteRating } from 'actions/feedback/rate';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { LoggedInUser, Rating } from 'actions';
import { useSelector } from 'react-redux';
import { loginSelector } from 'selectors';

const RatingCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  margin-bottom: 10px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
  padding: 15px;
  border-radius: 5px;
  position: relative;
  width: 100%;
`

const FeedbackUserWrapper = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #444;
  min-width: 0;
`

const FeedbackUserName = styled.h6`
  margin-top: 8px;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DropdownMenu = styled(Menu)`
  position: absolute;
  right: 5px;
  top: 3px;
  margin: 5px;
  `

const RatingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 1%;
`

const Rate = styled.h6`
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  width: 35px;
  height: 35px;
  margin-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 100%;
`

const Time = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: #444;
  text-align: center;
`

const DeletingRatingWrapper = styled.div`
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

function RatingCard({ item }: { item: Rating }) {
  const [deletingRating, setDeletingRating] = useState(false);

  const { user } = useSelector(loginSelector);

  const dispatch = useAppDispatch();

  return (
    <RatingCardWrapper key={item._id} bgColor={colors.sky}>
      <FeedbackUserWrapper>
        <UserImage photo={item.user.photo} name={item.user.name} size="45px" />
        <FeedbackUserName>{item.user.name.split(' ')[0]}</FeedbackUserName>
      </FeedbackUserWrapper>
      <RatingContent>
        <Rate>{item.rating}</Rate>
        <Time>{timeFormatter(item.updatedAt)}</Time>
      </RatingContent>
      {
        user && item.user._id === user._id &&
        <DropdownMenu items={[['Delete Rating', () => {
          setDeletingRating(true);
          dispatch(deleteRating(item.recording, item._id, setDeletingRating));
        }]]} />
      }
      {
        deletingRating &&
        <DeletingRatingWrapper>
          Deleting Rating...
        </DeletingRatingWrapper>
      }
    </RatingCardWrapper>)
}

export default RatingCard;
