import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import SvgSprite from 'assets/images/sprite.svg';

const LogInForm = ({ touched, errors, isSubmitting }) => {
  return(
    <Form className="login-form">
      <div className="login-error">
        {touched.username && errors.username && <p>{errors.username}</p>}
      </div>
      <div className="login-email">
        <div>
          <Field type="text" placeholder="Email" name="username" />
          <svg>
            <use xlinkHref={`${SvgSprite}#icon-envelop`} />
          </svg>
        </div>
      </div>
      <div className="login-error">
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <div className="login-password">
        <div>
          <Field type="password" placeholder="Password" name="password" />
          <svg>
            <use xlinkHref={`${SvgSprite}#icon-key`} />
          </svg>
        </div>
      </div>
      <div className="login-button">
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          Login
        </button>
      </div>
      <div className="login-redirect">
        <p>Don&apos;t have an account? &nbsp;</p><Link to="/signup">Sign Up</Link>
      </div>    
    </Form>
  );
}
const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      username: '',
      password: '',
    }
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {

    const { username, password } = values;
        
    const jsonBody = JSON.stringify({
      "username": username,
      "password": password
    });
    
    window.fetch('/apis/users/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': "application/json"
      },
      body: jsonBody
    })
    .then((results) => {
      if(results.status === 500) {
        throw Error("Internal Server Error");
      }
      return results.json();
    })
    .then((data) => {
      if(data.errors) {
        setErrors({ 'username': data.errors.username, 'password': data.errors.password });
      } else {
        resetForm();
      }
      setSubmitting(false);
    })
    .catch((err) => {
      console.log(err.message);
    });
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().email("Invalid Email").required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
})(LogInForm);

export default FormikApp;