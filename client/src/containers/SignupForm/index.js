import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import UserPhoto from "assets/images/user.jpg";
import SvgSprite from "assets/images/sprite.svg";
import { logIn } from "actions/auth";

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const mediumRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

let imageData;

const onFileChange = e => {
  [imageData] = e.target.files;
  const userImg = document.querySelector(".signup-form .signup-image");
  const reader = new FileReader();
  e.persist();

  reader.onload = event => {
    userImg.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

const SignUpForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  isLoggedIn,
  history
}) => {
  if (isLoggedIn) {
    return <div>{history.push("/profile")}</div>;
  }

  return (
    <Form className="signup-form">
      <div className="signup-left">
        <div className="signup-profile-pic">
          <label htmlFor="user-photo" className="choose-photo">
            <img className="signup-image" src={UserPhoto} alt="user" />
            <label htmlFor="user-photo" className="choose-photo-cover">
              Choose
              <br />
              Photo
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
        <div className="signup-error">
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div className="signup-email">
          <div>
            <Field type="text" placeholder="Email" name="email" />
            <svg>
              <use xlinkHref={`${SvgSprite}#icon-envelop`} />
            </svg>
          </div>
        </div>
        <div className="signup-error">
          {touched.displayname && errors.displayname && (
            <p>{errors.displayname}</p>
          )}
        </div>
        <div className="signup-display-name">
          <div>
            <Field type="input" placeholder="Display Name" name="displayname" />
            <svg>
              <use xlinkHref={`${SvgSprite}#icon-user`} />
            </svg>
          </div>
        </div>
        <div className="signup-error">
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <div className="signup-password">
          <div>
            <Field type="password" placeholder="Password" name="password" />
            <span className="password-strength">
              {strongRegex.test(values.password) ? (
                <span className="text-green">Strong</span>
              ) : mediumRegex.test(values.password) ? (
                <span className="text-orange">Medium</span>
              ) : values.password === "" ? (
                ""
              ) : (
                <span className="text-red">Weak</span>
              )}
            </span>
            <svg>
              <use xlinkHref={`${SvgSprite}#icon-key`} />
            </svg>
          </div>
        </div>
        <div className="signup-password-tip">
          <p>
            Strong Password must contain at least a capital letter, a small
            letter, a digit and a symbol
          </p>
        </div>
      </div>
      <div className="signup-right">
        <div className="signup-singing-style">
          <div className="signup-singing-style-heading">
            <p>Singing Style</p>
          </div>
          <div className="signup-singing-style-labels">
            <label htmlFor="checkbox-bollywood">
              <Field id="checkbox-bollywood" type="checkbox" name="bollywood" />
              <label htmlFor="checkbox-bollywood">
                <span>
                  <svg>
                    <use xlinkHref={`${SvgSprite}#icon-checkmark`} />
                  </svg>
                </span>
              </label>
              <span>Bollywood</span>
            </label>
            <label htmlFor="checkbox-indian-classical">
              <Field
                id="checkbox-indian-classical"
                type="checkbox"
                name="indian"
              />
              <label htmlFor="checkbox-indian-classical">
                <span>
                  <svg>
                    <use xlinkHref={`${SvgSprite}#icon-checkmark`} />
                  </svg>
                </span>
              </label>
              <span>Indian Classical</span>
            </label>
            <label htmlFor="checkbox-english">
              <Field id="checkbox-english" type="checkbox" name="english" />
              <label htmlFor="checkbox-english">
                <span>
                  <svg>
                    <use xlinkHref={`${SvgSprite}#icon-checkmark`} />
                  </svg>
                </span>
              </label>
              <span>English</span>
            </label>
          </div>
        </div>
        <div className="signup-error">
          {touched.level && errors.level && <p>{errors.level}</p>}
        </div>
        <div className="signup-singing-level">
          <div className="signup-singing-level-heading">
            <p>Singing Level</p>
          </div>
          <div className="signup-singing-level-labels">
            <label htmlFor="radio-beginner">
              <Field
                id="radio-beginner"
                type="radio"
                name="level"
                value="Beginner"
              />
              <label htmlFor="radio-beginner">
                <span>
                  <span />
                </span>
              </label>
              <span>Beginner</span>
            </label>
            <label htmlFor="radio-intermediate">
              <Field
                id="radio-intermediate"
                type="radio"
                name="level"
                value="Intermediate"
              />
              <label htmlFor="radio-intermediate">
                <span>
                  <span />
                </span>
              </label>
              <span>Intermediate</span>
            </label>
            <label htmlFor="radio-expert">
              <Field
                id="radio-expert"
                type="radio"
                name="level"
                value="Expert"
              />
              <label htmlFor="radio-expert">
                <span>
                  <span />
                </span>
              </label>
              <span>Expert</span>
            </label>
          </div>
        </div>
        <div className="signup-button">
          <button
            className="primary-button"
            type="submit"
            disabled={isSubmitting}
          >
            Sign up
          </button>
        </div>
        <div className="signup-redirect">
          <p>Already have an account ? &nbsp;</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </Form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      displayname: "",
      email: "",
      password: "",
      level: "",
      image: ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    const { logInUser, history } = props;

    const { displayname, email, password, level } = values;

    const formdata = new FormData();

    formdata.append("displayname", displayname);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("level", level);

    const style = [];

    if (values.bollywood) style.push("Bollywood");

    if (values.indian) style.push("Indian Classical");

    if (values.english) style.push("English");

    formdata.append("style", style);

    formdata.append("image", imageData);

    window
      .fetch("/apis/users/register", {
        credentials: "include",
        method: "POST",
        body: formdata
      })
      .then(results => {
        if (results.status === 500) throw Error("Internal Server Error");
        return results.json();
      })
      .then(data => {
        console.log(data);
        if (data.errors) {
          setErrors({
            email: data.errors.email || "",
            password: data.errors.password || "",
            displayname: data.errors.displayname || "",
            level: data.errors.level || ""
          });
        } else {
          logInUser(data.user);
          resetForm();
          history.push("/profile");
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
      .required("Display name is required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string()
      .min(
        5,
        "Password must be greater or equal to 5 and smaller or equal to 25"
      )
      .max(
        25,
        "Passsword must be greater or equal to 5 and smaller or equal to 25"
      )
      .required("Password is required"),
    level: Yup.string("Invalid level").required("Singing level is required")
  })
})(SignUpForm);

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      logInUser: logIn
    }
  )(FormikApp)
);
