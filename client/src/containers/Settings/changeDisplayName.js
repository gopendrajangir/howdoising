import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import SvgSprite from "assets/images/sprite.svg";
import { logIn } from "actions/auth";
import * as Yup from "yup";

const ChangeDisplayNameForm = ({
  isSubmitting,
  closeModal,
  errors,
  touched
}) => {
  return (
    <Form className="change-form-display-name">
      <div className="change-form-display-name-content">
        <div className="change-form-display-name-content-error">
          {touched.displayname && errors.displayname && (
            <p>{errors.displayname}</p>
          )}
        </div>
        <div className="change-form-display-name-content-name">
          <Field type="input" placeholder="Display Name" name="displayname" />
          <svg>
            <use xlinkHref={`${SvgSprite}#icon-user`} />
          </svg>
        </div>
      </div>
      <div className="private-profile-details-change-footer">
        <button
          className="private-profile-details-change-footer-button-cancel"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          className="private-profile-details-change-footer-button-save"
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ displayname }) {
    return {
      displayname: displayname || ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    const { logInUser, closeModal } = props;

    const { displayname } = values;

    const formdata = new FormData();

    formdata.append("displayname", displayname);

    window
      .fetch("/apis/users/private/profile/displayname", {
        credentials: "include",
        method: "POST",
        body: formdata
      })
      .then(results => {
        if (results.status === 500) throw Error("Internal Server Error");
        return results.json();
      })
      .then(data => {
        if (data.errors) {
          setErrors({
            displayname: data.errors.displayname || ""
          });
        } else {
          closeModal();
          logInUser(data.user);
          resetForm();
        }
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err.message);
        setSubmitting(false);
      });
  },
  validationSchema: Yup.object().shape({
    displayname: Yup.string()
      .min(
        5,
        "Display name must be greater or equal to 5 and smaller or equal to 15"
      )
      .max(
        15,
        "Display name must be greater or equal to 5 and smaller or equal to 15"
      )
      .required("Display name is required")
  })
})(ChangeDisplayNameForm);

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  {
    logInUser: logIn
  }
)(FormikApp);
