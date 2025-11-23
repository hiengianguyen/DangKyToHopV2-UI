import { useEffect, useRef, useState } from "react";

import style from "../../Pages/Combination/CombinationSteps/CombinationStep2/CombinationStep2.module.scss";
import classNames from "classnames/bind";
import CropAvatarStudent from "../../Pages/Combination/Component/CropAvatarStudent";

const cx = classNames.bind(style);

function UploadSignature({ title = "Chữ ký", dataAvatarImg = "", name = "", onValue = () => {} }) {
  const fileInputRef = useRef();
  const [fileInput, setFileInput] = useState();
  const [urlAvarTar, setUrlAvarTar] = useState(null);
  const [urlAvarTarResult, setUrlAvarTarResult] = useState(null);
  const [showResultImg, setShowResultImg] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    setFileInput(fileInputRef.current);
  }, []);

  useEffect(() => {
    if (dataAvatarImg === "") return;
    if (dataAvatarImg) {
      setUrlAvarTarResult(dataAvatarImg);
      onValue(dataAvatarImg);
      setShowResultImg(true);
    }
  }, [dataAvatarImg]);

  const handleGetUrlImg = (file) => {
    if (!file) return;
    const urlImg = URL.createObjectURL(file);
    setShowResultImg(true);
    setShowCropper(true);
    setUrlAvarTar(urlImg);
    onValue(urlImg);
  };

  return (
    <>
      {!showResultImg && (
        <div
          title={title}
          style={{ width: "260px", height: "130px" }}
          onClick={() => fileInput.click()}
          className="border-gray-500 border-2 m-4 flex items-center justify-center cursor-pointer hover:bg-sky-50"
        >
          <img className="size-24" src="/upload.png" alt="" />
          <p className="ms-3">Tải lên chữ ký</p>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className={cx("choose-avatar")}
        onChange={(e) => handleGetUrlImg(e.target.files[0])}
        style={{ display: "none" }}
      />
      {showCropper && (
        <CropAvatarStudent
          size={260 / 130}
          setShowCropper={setShowCropper}
          imgUrl={dataAvatarImg || urlAvarTar}
          onChangeImg={setUrlAvarTarResult}
        />
      )}
      {showResultImg && (
        <img src={urlAvarTarResult || dataAvatarImg || null} style={{ width: "260px", height: "130px", marginTop: "10px" }} alt="" />
      )}
      {showResultImg && (
        <div className="flex gap-4">
          <button type="button" className={cx("btn-choose-file", "btn btn-primary fs-2 mt-3")} onClick={() => fileInput.click()}>
            Chọn ảnh
          </button>
          <button type="button" className={cx("btn btn-secondary fs-2 mt-3")} onClick={() => setShowCropper(true)}>
            Cắt lại
          </button>
        </div>
      )}
      <input name={name} defaultValue={urlAvarTarResult} style={{ display: "none" }} />
    </>
  );
}

export default UploadSignature;
