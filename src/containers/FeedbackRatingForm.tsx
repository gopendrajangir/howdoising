import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { setMessage } from 'actions/message';
import { rateRecording } from 'actions/feedback/rate';
import { UserContext } from 'context';
import Button from 'components/utils/Button';
import { useSelector } from 'react-redux';
import { loginSelector } from 'selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { MessageTypes } from 'actions';

const RatingFeedback = styled.div`
  width: 100%;
  margin-top: 10px;
`

const RatingMeter = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RatingSlider = styled.input`
  width: 100%;
  margin-bottom: 3px;
  cursor: pointer;

  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%;
  height: 5px !important;
  border-radius: 5px;
  outline: none;
  background-image: linear-gradient(to right, red, orange, green);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #aaa;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #007bff;
    cursor: pointer;
  }
`

const RatingScale = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const RatingScaleMarks = styled.div`
  display: flex;
  justify-content: space-between;
`

const RatingScaleMark = styled.div`
  width: 15px;
  height: 5px;
  display: flex;
  justify-content: center;

  &::after {
    content: "";
    display: flex;
    height: 5px;
    width: 1px;
    background-color: #888;
  }
`

const RatingScaleDigits = styled.div`
  display: flex;
  justify-content: space-between;
`

const RatingScaleDigit = styled.div`
  width: 15px;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  color: #666;
`

const RatingFeedbackTitle = styled.p`
  font-size: 14px;
`

function FeedbackForm({ recordingId, recordingUserId, userRated, setError }: { recordingId: string, recordingUserId: string, userRated: number | false, setError: Function }) {
  const [isRating, setIsRating] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm()
  const { isLoggedIn, user } = useSelector(loginSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setIsRating(false);
    }
  }, [setError])

  const arr: number[] = [];

  for (let i = 1; i <= 20; i++) {
    arr.push(i + 1);
  }

  const rating = watch('rating', userRated ? userRated : 10);

  useEffect(() => {
    const rating = userRated ? userRated : 10;
    setValue('rating', rating);
  }, [userRated]);

  return (
    <Form style={{ width: 'auto' }} onSubmit={handleSubmit((data) => {
      if (!isLoggedIn) {
        dispatch(setMessage("You are not logged in", MessageTypes.danger));
      } else {
        if (user && (user._id === recordingUserId)) {
          return setError("You can not rate your own post");
        }
        setIsRating(true);
        dispatch(rateRecording(recordingId, { rating: data.rating }, setIsRating, "/" + window.location.hash.split('/')[1]));
      }
    })} className="mb-3 flex flex-col">
      <RatingFeedback>
        <RatingFeedbackTitle>Rating</RatingFeedbackTitle>
        <RatingMeter>
          <RatingSlider
            {...register("rating", { required: true })}
            type="range" min="1" max="20" step="1"
            value={rating}
            onChange={(e) => {
              // if (parseInt(e.target.value) < 10) {
              //   e.preventDefault();
              //   e.target.value = '10';
              // } else {
              // setValue('rating', e.target.value);
              // }
              setValue('rating', e.target.value);
            }}
          />
          <RatingScale>
            <RatingScaleMarks>
              {
                arr.map((n, i) => {
                  return <RatingScaleMark key={i} />
                })
              }
            </RatingScaleMarks>
            <RatingScaleDigits>
              {
                arr.map((n: number, i) => {
                  return <RatingScaleDigit key={i}>{n - 1}</RatingScaleDigit>
                })
              }
            </RatingScaleDigits>
          </RatingScale>
        </RatingMeter>
      </RatingFeedback>
      <Button type="submit" className="mt-2 px-3 py-2 self-end bg-slate-900" disabled={(!isLoggedIn && (isLoggedIn && isRating))}>
        {
          !isRating ? "Rate" : "Rating..."
        }
      </Button>
    </Form>
  )
}

export default FeedbackForm;