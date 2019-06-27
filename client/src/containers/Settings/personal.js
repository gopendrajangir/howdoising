import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserImage from "assets/images/user.jpg";
import SvgSprite from "assets/images/sprite.svg";
import ChangeProfileModal from "components/Settings/changeProfileModal";
import ChangeProfileImage from "./changeProfileImage";
import ConfirmImagePrivacy from "./confirmImagePrivacy";
import ChangeDisplayName from "./changeDisplayName";

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    const { image, privacy } = this.props.user;
    this.state = {
      user: null,
      error: null,
      current: null,
      change: false,
      imageId: image.$id,
      imagePrivacy: privacy.image
    };

    this.changeCurrentModal = this.changeCurrentModal.bind(this);
    this.privacyChangeHandler = this.privacyChangeHandler.bind(this);
    this.cancelPrivacyChange = this.cancelPrivacyChange.bind(this);
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

  privacyChangeHandler(event) {
    this.setState({
      change: true,
      current: "imagePrivacy",
      imagePrivacy: event.target.value
    });
  }

  cancelPrivacyChange() {
    return () => {
      const { imagePrivacy: imgPrivacy } = this.state;
      this.setState({
        change: false,
        current: 0,
        imagePrivacy: imgPrivacy === "Public" ? "Private" : "Public"
      });
    };
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
      current: null
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
    const { user, error, change, current, imageId, imagePrivacy } = this.state;

    return (
      <div className="private-profile-container">
        <div className="private-profile">
          {error}
          {user && (
            <div className="private-profile-details">
              <div className="private-profile-details-image">
                <div className="private-profile-details-image-content">
                  <div className="private-profile-details-image-content-image">
                    <img
                      src={`/apis/images/${imageId}`}
                      alt="user"
                      onError={event => {
                        event.target.src = UserImage;
                      }}
                    />
                  </div>
                </div>
                <div className="private-profile-details-image-edit">
                  <button
                    type="button"
                    className="private-profile-details-image-edit-button"
                    onClick={this.changeCurrentModal("imageEdit")}
                  >
                    <span className="private-profile-details-image-edit-button-icon">
                      <svg>
                        <use xlinkHref={`${SvgSprite}#icon-pencil`} />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="private-profile-details-image-privacy">
                  <select
                    name="privacy"
                    id="profile-image-privacy"
                    onChange={this.privacyChangeHandler}
                    value={imagePrivacy}
                  >
                    <option value={imagePrivacy}>{imagePrivacy}</option>
                    <option
                      value={imagePrivacy === "Public" ? "Private" : "Public"}
                    >
                      {imagePrivacy === "Public" ? "Private" : "Public"}
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
                    onClick={this.changeCurrentModal("nameEdit")}
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
                    onClick={this.changeCurrentModal("emailEdit")}
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
                    onClick={this.changeCurrentModal("levelEdit")}
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
                      <span key={st}>
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
                    onClick={this.changeCurrentModal("styleEdit")}
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
                  {current === "imageEdit" ? (
                    <ChangeProfileImage
                      closeModal={this.closeModal}
                      imageId={imageId}
                      changeImage={this.changeImage}
                    />
                  ) : current === "imagePrivacy" ? (
                    <ConfirmImagePrivacy
                      cancelPrivacyChange={this.cancelPrivacyChange}
                      imagePrivacy={imagePrivacy}
                      emailPrivacy={user.privacy.email}
                      closeModal={this.closeModal}
                    />
                  ) : current === "nameEdit" ? (
                    <ChangeDisplayName
                      closeModal={this.closeModal}
                      displayname={user.displayname}
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
