import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from 'actions/auth';

const Logout = ({ history, isLoggedIn, logOutUser }) => {
  if(!isLoggedIn) {
    history.push('/login');
  } else {
    window.fetch('/apis/users/logout')
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if(!data.errors) {
          console.log(data.msg)
          history.push('/login');
          logOutUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>Logout</div>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  }
}

export default withRouter(connect(mapStateToProps, { logOutUser: logOut })(Logout));