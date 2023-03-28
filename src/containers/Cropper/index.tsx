import React, { useState, useRef, useEffect } from 'react'

import { api } from 'utils/apis';

import UserPhoto from 'assets/img/user.png';
import Sprite from 'assets/img/sprite.svg';

import Button from 'components/utils/Button';
import Cropper from './Cropper.jsx';

import { updatePhoto } from 'actions/user/update';
import { useAppDispatch } from 'hooks/useAppDispatch';

function AvatarCropper({ photo }: { photo: string }) {
  const [image, setImage] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();

  const photoSrc = `${api}/static/images/${photo}`;
  const imageUrl = photo ? photoSrc : UserPhoto;

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, [])

  function onFileChange(e: any) {
    setShowCropper(true);
    const file = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onloadend = (e: any) => {
      if (isMounted.current) {
        setImage(e.target.result);
        e.target.value = '';
      }
    };
  };

  function onSave(url: string) {
    if (isMounted.current) {
      setImage(url);
      setShowCropper(false);
    }
  };

  const onCancel = () => {
    setShowCropper(false);
  };

  async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/jpeg' });
  }

  const onSubmit = async () => {

    setIsUpdating(true);

    const file = await dataUrlToFile(image, "image.jpeg");
    const formData = new FormData();
    formData.append('photo', file);

    await dispatch(updatePhoto(formData));

    if (isMounted.current) {
      setIsUpdating(false);
      setImage('');
    }
  }

  return (
    <div className="flex flex-col items-center mb-4">
      {
        !showCropper ?
          <div style={{ height: "200px", width: "200px" }} className="flex justify-center items-center rounded-full relative overflow-hidden">
            <img className="w-full" src={image ? image : imageUrl} alt="LoggedInUser" />
            <label htmlFor='image_input' className="absolute h-full w-full opacity-60 transition-opacity hover:opacity-100 cursor-pointer flex justify-center items-center">
              <svg className="h-16 w-16 fill-slate-300">
                <use xlinkHref={`${Sprite}#icon-camera`} />
              </svg>
            </label>
            <input id="image_input" type="file" hidden onChange={onFileChange} />
          </div>
          :
          <Cropper
            width={200}
            height={200}
            url={image}
            onCancel={onCancel}
            onSave={onSave}
          />
      }
      {
        image && !showCropper && <div className="flex mt-4">
          <Button disabled={isUpdating} onClick={() => { onSubmit() }}>Update</Button>
          {
            !isUpdating &&
            <Button disabled={isUpdating} className="ml-3 !bg-red-500" onClick={() => { setImage('') }}>Cancel</Button>
          }
        </div>
      }
    </div>
  )
}

export default AvatarCropper;
