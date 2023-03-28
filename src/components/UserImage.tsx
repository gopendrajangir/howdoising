import React, { HTMLAttributes } from 'react'
import { api } from 'utils/apis'
import UserPhoto from 'assets/img/user.png';

interface UserImageProps extends HTMLAttributes<HTMLImageElement> {
  photo?: string;
  name: string;
  size?: string;
  className?: string;
}

function UserImage({ photo, name, size = '40px', ...props }: UserImageProps) {
  const photoSrc = photo ? `${api}/static/images/${photo}` : UserPhoto;

  return (
    <img className={`${props.className} rounded-full`} src={photoSrc} alt="user" style={{ width: size }} {...props} />
  )
}

export default React.memo(UserImage);