import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import Sprite from 'assets/img/sprite.svg';

import RecordingModal from './RecordingModal';

import timeFormatter from 'utils/timeFormatter';

import UserImage from 'components/UserImage';
import Modal from './Modal';
import AverageRating from './feedbacks/AverageRating';
import { useSelector } from 'react-redux';
import { loginSelector } from 'selectors';
import { HomeRecording } from 'actions';

const Card = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
  height: 130px;
  border-radius: 5px;
  display: flex;
  color: inherit;
  align-items: stretch;
  padding: 5px;
  position: relative;
  transition: .1s;
  `

const PlayButton = styled.button`
  bottom: 0;
  right: 0;
  margin-top: auto;
  margin-bottom: 10px;
  margin-right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: none;
  background-color: transparent;
  position: absolute;
  `

const PlaySvg = styled.svg`
  cursor: pointer;
  fill: #444;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 100%;
  padding: 5px;
  padding-left: 13px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  `

const CardLeft = styled.div`
width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

const CardCenter = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  overflow: hidden;
`

const CardRight = styled.div`
  margin-left: 2%;
  margin-right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-right: 20px;
  padding-left: 5px;
  width: 80px;
`

const CardTitle = styled.h6`
  font-size: 16px;
  overflow: hidden;
  height: 20px;
`

const CardDescription = styled.p`
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 0;
  max-height: 35px;
  overflow: hidden;
  text-overflow: ellipsis; 
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: 12px;
  justify-content: space-between;
  `

const CardStat = styled.div`
  display: flex;
  align-items: center;
  flex: 0;
`

const CardStatIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 7px;
  fill: #444;
`

const CardStatIconUser = styled(CardStatIcon)`
  fill: #ff4757;
`

const CardStatValue = styled.span`
  font-size: 16px;
  line-height: 16px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  `

const CardStatValueUser = styled(CardStatValue)`
  color: #ff4757;
`

const UserWrapper = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  align-self: center;
  color: inherit;
`

const UserName = styled.h6`
  font-size: 13px;
  line-height: 13px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 0;
  width: 100%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardRating = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
`

const CardRatingCircleWrapper = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  height: 100%;
  width: 150px;
  border-radius: 5px;
  overflow: hidden;
`

const CardRatingCircle = styled.div`
  position: absolute;
  top: -70px;
  right: -70px;
  height: 170px;
  width: 170px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.05);
`

const UserTagWrapper = styled.svg`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 100%;
`

const UserTag = styled.svg`
  fill: rgba(0, 0, 0, 0.2);
`

function RecordingCard({ index, recording }: { index: number, recording: HomeRecording }) {
  const { _id, title, description, ratingsAverage, ratingsQuantity, commentsQuantity, createdAt, user, userRated, userCommented } = recording;
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const createdTime = timeFormatter(createdAt);

  const { isLoggedIn, user: currentUser } = useSelector(loginSelector);

  return (
    <div className="mx-2.5 mb-5 relative cursor-pointer">
      <Modal modalShow={modalShow}>
        <RecordingModal setModalShow={setModalShow} recording={recording} />
      </Modal>
      <div onClick={() => {
        navigate(`/recording/${_id}`)
      }} className="h-[130px] rounded flex p-1 relative shadow-md bg-[#dff9fb]">
        {
          currentUser && currentUser._id === user._id &&
          <UserTagWrapper>
            <UserTag>
              <use xlinkHref={`${Sprite}#icon-user`} />
            </UserTag>
          </UserTagWrapper>
        }
        <CardLeft />
        <CardCenter className="ps-2 pt-3 pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardFooter>
            <CardStat style={{ marginRight: '10px' }}>
              {
                userRated && isLoggedIn ?
                  <>
                    <CardStatIconUser className="!fill-cyan-600">
                      <use xlinkHref={`${Sprite}#icon-star-full`} />
                    </CardStatIconUser>
                    <CardStatValueUser className="!text-cyan-600">
                      {ratingsQuantity}
                    </CardStatValueUser>
                  </>
                  :
                  <>
                    <CardStatIcon>
                      <use xlinkHref={`${Sprite}#icon-star-empty`} />
                    </CardStatIcon>
                    <CardStatValue>
                      {ratingsQuantity}
                    </CardStatValue>
                  </>
              }
            </CardStat>
            <CardStat>
              {
                userCommented && isLoggedIn ?
                  <>
                    <CardStatIconUser className="!fill-cyan-600">
                      <use xlinkHref={`${Sprite}#icon-bubble`} />
                    </CardStatIconUser>
                    <CardStatValueUser className="!text-cyan-600">
                      {commentsQuantity}
                    </CardStatValueUser>
                  </>
                  :
                  <>
                    <CardStatIcon>
                      <use xlinkHref={`${Sprite}#icon-comment-o`} />
                    </CardStatIcon>
                    <CardStatValue>
                      {commentsQuantity}
                    </CardStatValue>
                  </>}
            </CardStat>
            <CardStat style={{ marginLeft: '10px' }}>
              <CardStatValue style={{ fontSize: '12px', flexWrap: 'wrap' }}>
                {createdTime.split(' ').map((word, i) => <span key={i}>{word} </span>)}
              </CardStatValue>
            </CardStat>
          </CardFooter>
        </CardCenter>
        <CardRight>
          <CardRating>
            <AverageRating rating={ratingsAverage} />
          </CardRating>
          <CardRatingCircleWrapper>
            <CardRatingCircle />
          </CardRatingCircleWrapper>
        </CardRight>
      </div>
      <PlayButton
        onClick={(e) => {
          setModalShow(true)
        }}
      >
        <PlaySvg className="recording-card-btn">
          <use className="recording-card-btn" xlinkHref={`${Sprite}#icon-play3`} />
        </PlaySvg>
      </PlayButton>
      <UserWrapper onClick={() => {
        navigate(`/user/${user._id}`)
      }}>
        <UserImage photo={user.photo} name={user.name} />
        <UserName>{user.name.split(' ')[0]}</UserName>
      </UserWrapper>
    </div>
  )
}

export default RecordingCard
