import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Axios from 'axios';

import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';
import LimitTextArea from './LimitTextArea';

import Button from './utils/Button'
import { api } from 'utils/apis';

import { setMessage } from 'actions/message';
import { loginSelector } from 'selectors';
import { MessageTypes } from 'actions';
import { useAppDispatch } from 'hooks/useAppDispatch';

interface RecordFormProps {
  file: File,
  setShowForm: Dispatch<SetStateAction<boolean>>,
  setShowAudio: Dispatch<SetStateAction<boolean>>
}

function RecordForm({ file, setShowForm, setShowAudio }: RecordFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const description = watch('description', '');

  useEffect(() => {
    return () => {
      setIsSaving(false);
      setShowForm(false);
    }
  }, []);

  const { isLoggedIn } = useSelector(loginSelector);
  const dispatch = useAppDispatch();

  return (
    <form onSubmit={handleSubmit((data) => {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('recording', file);

      setIsSaving(true);

      Axios.post(`${api}/recordings`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }).then((result) => {
          setIsSaving(false);
          dispatch(setMessage("Recording uploaded successfully", MessageTypes.success));
          setShowForm(false);
          setShowAudio(false);
        }).catch((err) => {
          setIsSaving(false);
          dispatch(setMessage("Error while uploading recording", MessageTypes.danger));
          console.log(err);
        })
    })}>
      {
        !isLoggedIn &&
        <div className="mb-3 w-100">
          <p className="text-red-500">
            You are not logged in!
          </p>
        </div>
      }
      <FormGroup className="mb-1 flex flex-col">
        <FormLabel className="mb-2" htmlFor="title_input">Title</FormLabel>
        <FormInput id="title_input" {...register('title', { required: 'Title is required', minLength: 8, maxLength: 40 })} name="title" type="text" placeholder="Enter Title" disabled={!isLoggedIn} />
        <FormFeedback show={errors.title} className="mt-2">
          {
            errors.title
              ?
              errors.title.type === 'required'
                ?
                "Please provide a title"
                :
                errors.title.type === 'minLength'
                  ?
                  "Title must be atleast 8 characters long"
                  :
                  errors.title.type === 'maxLength'
                    ?
                    "Title must be less than or equal to 40 characters"
                    :
                    null
              :
              null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel className="mb-1" htmlFor="description_input">Description</FormLabel>
        <LimitTextArea
          register={() => register('description', { required: false, minLength: 0, maxLength: 500 })}
          id="description_input"
          type="description"
          value={description}
          setValue={setValue}
          limit={500}
          placeholder="Write your description here..."
          disabled={!isLoggedIn}
        />
      </FormGroup>
      <FormGroup className="!flex-row">
        {
          !isSaving
          &&
          <Button className="mr-2 !bg-red-500 hover:bg-red-400" disabled={isSaving} onClick={() => {
            setShowForm(false);
            setShowAudio(false);
          }}>
            Cancel
          </Button>
        }
        <Button type="submit" disabled={isSaving} disableOnly={!isLoggedIn}>
          Upload
        </Button>
      </FormGroup>
    </form>
  )
}


export default RecordForm;