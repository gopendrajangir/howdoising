import React from "react";
import { withFormik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SvgSprite from "assets/images/sprite.svg";
import { logIn } from "actions/auth";
import UserImage from "assets/images/user.jpg";

let imageData;

const onFileChange = e => {
  [imageData] = e.target.files;
  const userImg = document.querySelector(
    ".change-form-photo-pic .choose-photo-image"
  );
  const reader = new FileReader();
  e.persist();

  reader.onload = event => {
    userImg.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

const ChangePhotoForm = ({ isSubmitting, closeModal, isLoggedIn, imageId }) => {
  return (
    <Form className="change-form-photo">
      <div className="change-form-photo-pic">
        <div className="change-form-photo-pic-wrapper">
          <label htmlFor="user-photo" className="choose-photo">
            <img
              className="choose-photo-image"
              src={`/apis/images/${imageId}`}
              alt="user"
              onError={event => {
                event.target.src = UserImage;
              }}
            />
            <label htmlFor="user-photo" className="choose-photo-cover">
              <svg>
                <use xlinkHref={`${SvgSprite}#icon-camera`} />
              </svg>
            </label>
          </label>
          <Field
            hidden
            onChange={onFileChange}
            type="file"
            id="user-photo"
            name="image"
          />
        </div>
      </div>
      <div className="change-form-photo-footer">
        <button
          className="change-form-photo-footer-button-cancel"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          className="change-form-photo-footer-button-save"
          type="submit"
        >
          Save
        </button>
      </div>
      {!isLoggedIn ? <Redirect to="/login" /> : null}
    </Form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      image: ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    const { logInUser, user, changeImage } = props;

    const formdata = new FormData();

    formdata.append("image", imageData);

    window
      .fetch(`/apis/images/${user.image.$id}`, {
        credentials: "include",
        method: "POST",
        body: formdata
      })
      .then(results => {
        if (results.status === 500) throw Error("Internal Server Error");
        return results.json();
      })
      .then(data => {
        logInUser(data.user);
        changeImage(data.user.image.$id);
      })
      .catch(err => {
        console.log(err.message);
        setSubmitting(false);
      });
  }
})(ChangePhotoForm);

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
