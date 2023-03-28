import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'reducers';
import { createSelector } from '@reduxjs/toolkit';

import { resetPassword } from 'actions';
import Button from 'components/utils/Button';
import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';
import { useAppDispatch } from 'hooks/useAppDispatch';

const selector = createSelector(
  [(state: StoreState) => state.resetPassword],
  (resetPassword) => resetPassword
)

function ResetPasswordForm({ token }: { token: string }) {
  const { resetPasswordError, isResettingPassword } = useSelector(selector);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const password = watch('password', '');

  return (
    <form onSubmit={handleSubmit((data) => {
      setIsError(false);
      dispatch(resetPassword(token, data, setIsError, navigate));
    })}>
      {
        resetPasswordError && isError &&
        <p className="bg-red-500 text-white text-sm p-3 w-100 rounded mb-3">
          {resetPasswordError}
        </p>
      }
      <FormGroup>
        <FormLabel htmlFor="input_password">Password</FormLabel>
        <FormInput id="input_password" {...register("password", { required: true, minLength: 8, maxLength: 100 })} name="password" type="password" placeholder="Enter Password" />
        <FormFeedback show={errors.password}>
          {
            errors.password
              ?
              errors.password.type === 'required'
                ?
                "Please Provide password"
                :
                errors.password.type === 'minLength'
                  ?
                  "Password must be atleast 8 characters long"
                  :
                  errors.password.type === 'maxLength'
                    ?
                    "Password must be less than or equal to 100 characters"
                    : null
              : null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="input_password_confirm">Confirm Password</FormLabel>
        <FormInput id="input_password_confirm" {...register("passwordConfirm", { required: true, validate: (value) => password === value || "Passwords does not match" })} name="passwordConfirm" type="password" placeholder="Enter Confirm Password" />
        <FormFeedback show={errors.passwordConfirm}>
          {
            errors.passwordConfirm
              ?
              errors.passwordConfirm.type === 'validate'
                ?
                errors.passwordConfirm.message
                : null
              : null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button type="submit" disabled={isResettingPassword}>
          Reset Password
        </Button>
      </FormGroup>
    </form>
  )
}

export default ResetPasswordForm;