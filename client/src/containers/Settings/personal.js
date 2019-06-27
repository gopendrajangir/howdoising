import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserImage from "assets/images/user.jpg";
import SvgSprite from "assets/images/sprite.svg";
import ChangeProfileModal from "components/Settings/changeProfileModal";
import ChangeProfilePhoto from "./changeProfilePhoto";

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    const { image } = this.props.user;
    this.state = {
      user: null,
      error: null,
      current: 0,
      change: false,
      imageId: image.$id
    };

    this.changeCurrentModal = this.changeCurrentModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  changeImage(id) {
    this.setState({
      imageId: id,
      change: false,
      current: 0
    });
  }

  changeCurrentModal(current) {
    return () => {
      this.setState({
        change: true,
        current
      });
    };
  }

  closeModal() {
    this.setState({
      change: false,
      current: 0
    });
  }

  fetchUserDetails() {
    const { uid, history } = this.props;
    window
      .fetch(`/apis/users/private/profile/${uid}`)
      .then(results => {
        if (results.status === 404) {
          this.setState({
            error: "Could not find user details"
          });
        } else if (results.status === 403) {
          history.push("/logout");
        } else if (results.status === 500) {
          throw Error("Internal Server Error");
        } else {
          return results.json();
        }
      })
      .then(data => {
        this.setState({
          user: data.user
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  render() {
    const { user, error, change, current, imageId } = this.state;

    return (
      <div className="private-profile-container">
        <div className="private-profile">
          {error}
          {user && (
            <div className="private-profile-details">
              <div className="private-profile-details-photo">
                <div className="private-profile-details-photo-content">
                  <div className="private-profile-details-photo-content-image">
                    <img
                      src={`/apis/images/${imageId}`}
                      alt="user"
                      onError={event => {
                        event.target.src = UserImage;
                      }}
                    />
                  </div>
                </div>
                <div className="private-profile-details-photo-edit">
                  <button
                    type="button"
                    className="private-profile-details-photo-edit-button"
                    onClick={this.changeCurrentModal(1)}
                  >
                    <span className="private-profile-details-photo-edit-button-icon">
                      <svg>
                        <use xlinkHref={`${SvgSprite}#icon-pencil`} />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="private-profile-details-photo-privacy">
                  <select name="privacy" id="profile-photo-privacy">
                    <option value={user.privacy.image}>
                      {user.privacy.image}
                    </option>
                    <option
                      value={
                        user.privacy.image === "Public" ? "Private" : "Public"
                      }
                    >
                      {user.privacy.image === "Public" ? "Private" : "Public"}
                    </option>
                  </select>
                </div>
              </div>
              <div className="private-profile-details-name">
                <div className="private-profile-details-name-title">
                  Display Name
                </div>
                <div className="private-profile-details-name-value">
                  {user.displayname}
                </div>
                <div className="private-profile-details-name-edit">
                  <button
                    type="button"
                    className="private-profile-details-name-edit-button"
                    onClick={this.changeCurrentModal(2)}
                  >
                    <span className="private-profile-details-name-edit-button-icon">
                      <svg>
                        <use xlinkHref={`${SvgSprite}#icon-pencil`} />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="private-profile-details-email">
                <div className="private-profile-details-email-title">Email</div>
                <div className="private-profile-details-email-value">
                  {user.email}
                </div>
                <div className="private-profile-details-email-edit">
                  <button
                    type="button"
                    className="private-profile-details-email-edit-button"
                    onClick={this.changeCurrentModal(3)}
                  >
                    <span className="private-profile-details-email-edit-button-icon">
                      <svg>
                        <use xlinkHref={`${SvgSprite}#icon-pencil`} />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="private-profile-details-level">
                <div className="private-profile-details-level-title">Level</div>
                <div className="private-profile-details-level-value">
                  {user.level}
                </div>
                <div className="private-profile-details-level-edit">
                  <button
                    type="button"
                    className="private-profile-details-level-edit-button"
                    onClick={this.changeCurrentModal(4)}
                  >
                    <span className="private-profile-details-level-edit-button-icon">
                      <svg>
                        <use xlinkHref={`${SvgSprite}#icon-pencil`} />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="private-profile-details-style">
                <div className="private-profile-details-style-title">Style</div>
                <div className="private-profile-details-style-value">
                  {user.style.map((st, index) => {
                    return (
                      <span>
                        {st}
                        {index !== user.style.length - 1 ? "," : ""}&nbsp;&nbsp;
                      </span>
                    );
                  })}
                </div>
                <div className="private-profile-details-style-edit">
                  <button
                    type="button"
                    className="private-profile-details-style-edit-button"
                    onClick={this.changeCurrentModal(5)}
                  >
                    <span className="private-profile-details-style-edit-button-icon">
                      <svg>
                        <use xlinkHref={`${SvgSprite}#icon-pencil`} />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              {change ? (
                <ChangeProfileModal>
                  {current === 1 ? (
                    <ChangeProfilePhoto
                      closeModal={this.closeModal}
                      imageId={imageId}
                      changeImage={this.changeImage}
                    />
                  ) : null}
                </ChangeProfileModal>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(PersonalInfo));
