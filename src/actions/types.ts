export interface NotificationUser {
  _id: string;
  name: string;
  photo: string;
}

export interface NotificationRecording {
  _id: string;
  title: string;
}

export interface RatingNotification {
  id: string;
  rating: number;
  recording: NotificationRecording;
  user: NotificationUser;
}

export interface CommentNotification {
  id: string;
  recording: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  textComment?: string;
  voiceComment?: string;
}

export interface AnswerNotification {
  id: string;
  question: {
    _id: string,
    title: string,
  },
  user: {
    _id: string,
    name: string,
    photo: string,
  },
  textAnswer?: string,
  voiceAnswer?: string,
}

export interface Notification {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  rating?: RatingNotification;
  comment?: CommentNotification;
  answer?: AnswerNotification;
}

export interface LoggedInUser {
  id: string;
  _id: string;
  email: string;
  name: string;
  photo: string;
  unreadNotifications: number;
  notifications: Notification[];
}

export interface User {
  _id: string;
  name: string;
  photo: string;
  id: string;
}

export interface UserMeRating extends Omit<Rating, 'recording'> {
  recording: {
    _id: string,
    id: string
    title: string,
    description: string,
    user: User,
  },
}

export interface UserMeComment extends Omit<Comment, 'recording'> {
  recording: {
    _id: string,
    id: string
    title: string,
    description: string,
    user: User,
  },
}

export interface UserMe {
  id: string;
  _id: string;
  email: string;
  name: string;
  photo: string;
  recordings: HomeRecording[];
  ratings: UserMeRating[],
  comments: UserMeComment[]

}

export interface HomeRecording {
  id: string;
  _id: string;
  title: string;
  description: string;
  user: User;
  commentsQuantity: number;
  createdAt: Date;
  ratingsAverage: number;
  ratingsQuantity: number;
  recording: string;
  updatedAt: Date;
  userCommented: boolean;
  userRated: number | false;
}

export interface Rating {
  _id: string;
  id: string;
  rating: number;
  recording: string;
  user: User;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  id: string;
  textComment?: string;
  voiceComment?: string;
  recording: string;
  user: User;
  createdAt: Date;
}

export interface Recording {
  id: string;
  _id: string;
  title: string;
  description: string;
  user: User;
  comments: Comment[],
  ratings: Rating[],
  commentsQuantity: number;
  createdAt: Date;
  ratingsAverage: number;
  ratingsQuantity: number;
  recording: string;
  updatedAt: Date;
}

export interface LoginRequestBody {
  email: string,
  password: string,
}

export interface SetPasswordRequestBody {
  password: string,
  passwordConfirm: string
}

export interface RatingRequestBody {
  rating: number
}

export enum MessageTypes {
  danger,
  success
}

export interface Message {
  message: string,
  type: MessageTypes
}

export enum ActionTypes {
  loggingIn,
  loginSuccess,
  loginFailed,

  signingUp,
  signupSuccess,
  signupFailed,

  loggingOut,
  logoutSuccess,
  logoutFailed,

  settingPassword,
  setPasswordSuccess,
  setPasswordFailed,

  resettingPassword,
  resetPasswordSuccess,
  resetPasswordFailed,

  fetchRecordingsLoading,
  fetchRecordingsSuccess,
  fetchRecordingsFailed,

  fetchRecordingLoading,
  fetchRecordingSuccess,
  fetchRecordingFailed,

  searchRecordingsLoading,
  searchRecordingsSuccess,
  searchRecordingsFailed,

  fetchMeLoading,
  fetchMeSuccess,
  fetchMeFailed,

  setMessage
}
