import React from 'react';
import ModalLayout from 'shared/ModalLayout';
import SignupForm from 'containers/SignupForm';

export default () => {
  return (
    <ModalLayout>
      <div className="signup-container">
        <SignupForm />
      </div>
    </ModalLayout>
  );
}