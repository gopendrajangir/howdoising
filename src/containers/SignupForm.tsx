import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { signupUser } from 'actions/auth/signup';
import Button from 'components/utils/Button';
import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';
import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { StoreState } from 'reducers';

const selector = createSelector(
  [(state: StoreState) => state.signup],
  (signup) => signup
);

function SignupForm() {
  const { isSigningUp, signupError } = useSelector(selector);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    setIsError(false);
    dispatch(signupUser(data, setIsError, navigate));
  })

  return (
    <form onSubmit={onSubmit}>
      {
        signupError && isError &&
        <p className="bg-red-500 text-white text-sm p-3 w-100 rounded mb-3">
          {signupError}
        </p>
      }
      <FormGroup>
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
        <FormLabel htmlFor="input_name">Name</FormLabel>
        <FormInput id="input_name" {...register("name", { required: true, minLength: 5, maxLength: 20 })} name="name" type="text" placeholder="Enter Name" />
        <FormFeedback show={errors.name}>
          {
            errors.name
              ?
              errors.name.type === 'required'
                ?
                "Please provide a name"
                :
                errors.name.type === 'minLength'
                  ?
                  "Title must be atleast 5 characters long"
                  :
                  errors.name.type === 'maxLength'
                    ?
                    "Title must be less than or equal to 20 characters"
                    :
                    null
              :
              null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button type="submit" disabled={isSigningUp}>
          {
            !isSigningUp ? "Signup" : "Signing up..."
          }
        </Button>
      </FormGroup>
      <FormGroup className="!flex-row">
        <p className="text-sm mr-1">Already have an account?</p>
        <Link style={{ cursor: 'pointer' }} to="/login">
          <p className="text-sm text-indigo-800 hover:text-indigo-700">Login</p>
        </Link>
      </FormGroup>
    </form>
  )
}

export default SignupForm;