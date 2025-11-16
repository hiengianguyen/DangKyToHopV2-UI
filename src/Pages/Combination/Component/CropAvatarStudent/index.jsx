import { useRef } from "react";
import Cropper from "react-cropper";

import classNames from "classnames/bind";
import style from "./CropAvatarStudent.module.scss";

const cx = classNames.bind(style);

function CropAvatarStudent({ imgUrl = "", onChangeImg = () => {}, setShowCropper = () => {}, size = 3 / 4 }) {
  const cropperRef = useRef();
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    onChangeImg(cropper.getCroppedCanvas().toDataURL());
  };
  return (
    <>
      <Cropper
        className={cx("cropper")}
        ref={cropperRef}
        src={imgUrl ? imgUrl : undefined}
        style={{ width: "100%", height: "100%" }}
        aspectRatio={size}
        crop={onCrop}
        guides={false}
      />

      <button className={cx("btn-cropp", "btn btn-primary fs-2")} onClick={() => setShowCropper(false)}>
        Cắt ảnh
      </button>
    </>
  );
}

export default CropAvatarStudent;
