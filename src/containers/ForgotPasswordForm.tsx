import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Button from 'components/utils/Button';
import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';

import { api } from 'utils/apis';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const navigate = useNavigate();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  const onSubmit = useCallback(handleSubmit(async (data) => {
    try {
      setIsSendingLink(true);
      await Axios.post(`${api}/users/forgotPassword`, data);
      if (isMounted.current) {
        navigate('/sentResetPasswordLink', { state: { fromForgotPassword: true } });
      }
    } catch (err: any) {
      if (isMounted.current) {
        if (err && err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Some error occurred");
        }
        setIsSendingLink(false);
      }
    }
  }), []);

  return (
    <form onSubmit={onSubmit} >
      {
        error &&
        <p className="bg-red-500 text-white text-sm p-3 w-100 rounded mb-3">
          {error}
        </p>
      }
      <FormGroup>
        <p className="bg-teal-500 p-4 w-80 rounded text-white">We will send you a password reset link on the mail you will provide. You can click on that link and reset your password</p>
      </FormGroup>
      <FormGroup className="mb-3 mt-4">
        <FormLabel htmlFor="input_email">Email address</FormLabel>
        <FormInput id="input_email" {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} name="email" type="email" placeholder="Enter email" />
        <FormFeedback show={errors.email}>
          {
            errors.email
              ?
              errors.email.type === 'pattern'
                ?
                "Please provide a valid email"
                :
                errors.email.type === 'required'
                  ?
                  "Please provide an email"
                  :
                  null
              :
              null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button type="submit" disabled={isSendingLink}>
          Send Link
        </Button>
      </FormGroup>
    </ form >
  )
}

export default ForgotPassword;