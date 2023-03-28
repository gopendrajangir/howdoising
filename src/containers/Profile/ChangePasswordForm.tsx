import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { changePassword } from 'actions/user/update';
import { logoutUser } from 'actions/auth/login';

import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';
import Button from 'components/utils/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';

function ChangePasswordForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const newPassword = watch('newPassword', '');

  const dispatch = useAppDispatch();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setIsChangingPassword(true);
        dispatch(changePassword(data, () => {
          dispatch(logoutUser(navigate))
        }))
      })}
    >
      <FormGroup className='mb-5'>
        <FormLabel htmlFor="input_password" className="mb-1">Current Password</FormLabel>
        <FormInput id="input_password" {...register("password", { required: true })} name="password" type="password" placeholder="Enter Current Password" />
        <FormFeedback show={errors.password}>
          {
            errors.password
              ?
              errors.password.type === 'required'
                ?
                "Please Provide password"
                : null
              : null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup className='mb-5'>
        <FormLabel htmlFor="input_new_password" className="mb-1">New Password</FormLabel>
        <FormInput id="input_new_password" {...register("newPassword", { required: true, minLength: 8, maxLength: 100 })} name="newPassword" type="password" placeholder="Enter New Password" />
        <FormFeedback show={errors.newPassword}>
          {
            errors.newPassword
              ?
              errors.newPassword.type === 'required'
                ?
                "Please provide new password"
                :
                errors.newPassword.type === 'minLength'
                  ?
                  "Password must be atleast 8 characters long"
                  :
                  errors.newPassword.type === 'maxLength'
                    ?
                    "Password must be less than or equal to 100 characters"
                    : null
              : null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup className='mb-5'>
        <FormLabel htmlFor="input_new_password_confirm" className="mb-1">Confirm New Password</FormLabel>
        <FormInput id="input_new_password_confirm" {...register("newPasswordConfirm", { required: true, validate: (value) => newPassword === value || "Passwords does not match" })} name="newPasswordConfirm" type="password" placeholder="Enter Confirm New Password" />
        <FormFeedback show={errors.newPasswordConfirm}>
          {
            errors.newPasswordConfirm
              ?
              errors.newPasswordConfirm.type === 'validate'
                ?
                errors.newPasswordConfirm.message
                : null
              : null
          }
        </FormFeedback>
      </FormGroup>
      <FormGroup className="mb-2">
        <Button type="submit" disabled={isChangingPassword}>
          {
            !isChangingPassword ? "Change Password" : "Changing Password..."
          }
        </Button>
      </FormGroup>
    </form>
  )
}

export default ChangePasswordForm;