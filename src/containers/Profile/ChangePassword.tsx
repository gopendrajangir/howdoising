import React from 'react'

import ChangePasswordForm from './ChangePasswordForm';
import { LoggedInUser } from 'actions';

function BasicInfo({ user }: { user: LoggedInUser }) {
  return (
    <div className="flex flex-col items-center">
      <ChangePasswordForm />
    </div>
  )
}

export default BasicInfo;