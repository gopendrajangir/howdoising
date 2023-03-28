import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { createSelector } from '@reduxjs/toolkit';

import { loginUser } from 'actions/auth/login';

import Button from 'components/utils/Button';
import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';

import { StoreState } from 'reducers';

import { useAppDispatch } from 'hooks/useAppDispatch';

const selector = createSelector(
  [(state: StoreState) => state.login],
  (login) => login
)

function LoginForm() {
  const { isLoggingIn, loginError } = useSelector(selector);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    setIsError(false);
    dispatch(loginUser(data, setIsError));
  })

  return (
    <form onSubmit={onSubmit}>
      {
        loginError && isError &&
        <p className="bg-red-500 text-white text-sm p-3 w-100 rounded mb-3">
          {loginError}
        </p>
      }
      <FormGroup>
        <FormLabel htmlFor="input_email">Email address</FormLabel>
        <FormInput id="input_email" {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} name="email" type="email" placeholder="Enter email" />
        <FormFeedback show={errors.email}>
          Please provide email
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="input_password">Password</FormLabel>
        <FormInput id="input_password" {...register("password", { required: true })} name="password" type="password" placeholder="Enter Password" />
        <FormFeedback show={errors.password}>Please provide password</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button type="submit" disabled={isLoggingIn}>
          {
            !isLoggingIn ? "Login" : "Logging in..."
          }
        </Button>
      </FormGroup>
      <FormGroup className="mt-3">
        <LinkContainer style={{ cursor: 'pointer', marginRight: 'auto' }} to="/forgotPassword">
          <p className="text-sm text-indigo-800 hover:text-indigo-700">Forgot Password?</p>
        </LinkContainer>
      </FormGroup>
      <FormGroup className="!flex-row">
        <p className="text-sm mr-1">Don't have an account?</p>
        <LinkContainer style={{ cursor: 'pointer' }} to="/signup">
          <p className="text-sm text-indigo-800 hover:text-indigo-700">Signup</p>
        </LinkContainer>
      </FormGroup>
    </form>
  )
}

export default LoginForm;