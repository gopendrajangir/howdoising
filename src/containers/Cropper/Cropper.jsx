import React from 'react';
import { withCropper, Avatar, ZoomSlider } from 'simple-image-cropper';
import Button from 'components/utils/Button';

// import './cropper.css';

const Cropper = withCropper(
  ({ avatarProps, zoomSliderProps, onSave, onCancel }) => {
    return (
      <div className="flex flex-col items-center border border-slate-400 p-5 mb-5 rounded">
        <Avatar className="rounded-full" avatarProps={avatarProps} />
        <ZoomSlider className="my-5 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" zoomSliderProps={zoomSliderProps} />
        <div className="flex">
          <Button
            type="button"
            className="!bg-red-500"
            onClick={onCancel}
          >
            Discard
          </Button>
          <Button
            type="button"
            className="ml-4"
            onClick={onSave}
          >
            Crop
          </Button>
        </div>
      </div>
    );
  }
);

export default Cropper;
