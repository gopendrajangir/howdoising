import React from 'react'

import Cropper from 'containers/Cropper';
import NameUpdater from './NameUpdater';
import { FormGroup, FormInput, FormLabel } from 'components/Form';

import { LoggedInUser } from 'actions';

function BasicInfo({ user }: { user: LoggedInUser }) {
  return (
    <div className="flex flex-col items-center">
      <Cropper photo={user.photo} />
      <div>
        <FormGroup>
          <FormLabel htmlFor="input_email">Email</FormLabel>
          <FormInput className="bg-red-100 text-slate-700" disabled={true} id="input_email" value={user.email} />
        </FormGroup>
        <NameUpdater name={user.name} />
      </div>
    </div>
  )
}

export default BasicInfo;