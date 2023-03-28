import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { UserContext } from 'context';

import { setMessage, commentRecording, MessageTypes } from 'actions';
import Button from 'components/utils/Button';
import { useSelector } from 'react-redux';
import { loginSelector } from 'selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';

const CommentFeedback = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 0;
  position: relative;
`

const CharacterLeftCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 10px;
  color: #444;
  padding: 2px 5px;
  top: -20px;
  right: 2px;

`

const TextArea = styled(Form.Control)`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  resize: none;
  font-size: 13px;
  padding: 8px 10px;
  border: none;
  outline: none;
  border: 1px solid #ccc;
  color: #555;

  &::placeholder {
    color: #888;
  }

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`

const CommentFeedbackTitle = styled.p`
  font-size: 14px;
  align-self: flex-start;
`

function FeedbackForm({ recordingId }: { recordingId: string }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm()
  const { isLoggedIn } = useSelector(loginSelector);

  const comment = watch('comment', '');

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setIsCommenting(false);
    }
  }, [])

  return (
    <Form style={{ width: 'auto' }} onSubmit={handleSubmit((data) => {
      if (!isLoggedIn) {
        dispatch(setMessage("You are not logged in", MessageTypes.danger));
      } else {
        setIsCommenting(true);
        const formData = new FormData();
        formData.append('textComment', data.comment);
        dispatch(commentRecording(recordingId, formData, setIsCommenting, "/" + window.location.hash.split('/')[1]))
      }
    })} className="mb-3 flex flex-col">
      <CommentFeedbackTitle>Comment</CommentFeedbackTitle>
      <CommentFeedback>
        <CharacterLeftCount>{200 - comment.length}</CharacterLeftCount>
        <TextArea
          {...register("comment", { required: "Comment should contain atleast 1 character", minLength: 1, maxLength: 200 })}
          onChange={(e: { target: { value: string; }; }) => {
            if (e.target.value.length <= 200) {
              e.target.value = e.target.value.substring(0, 200);
              setValue('comment', e.target.value);
            } else {
              e.target.value = e.target.value.substring(0, 200);
            }
          }} name="comment" as="textarea" placeholder="Type your comment here..." draggable={false} />
      </CommentFeedback>
      <Button type="submit" className="mt-2 px-2 py-2 self-end" disabled={isLoggedIn && isCommenting}>
        {
          !isCommenting ? "Comment" : (
            <>
              <Spinner size="sm" className="me-2" animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
              Commenting
            </>
          )
        }
      </Button>
    </Form>
  )
}

export default FeedbackForm;