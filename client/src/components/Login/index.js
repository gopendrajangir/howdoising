import React from "react";
import ModalLayout from "shared/ModalLayout";
import LoginForm from "containers/LoginForm";

export default () => {
  return (
    <ModalLayout>
      <div className="login-container">
        <LoginForm />
      </div>
    </ModalLayout>
  );
};
