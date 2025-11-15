import classNames from "classnames/bind";
import style from "./FooterAdmin.module.scss";

const cx = classNames.bind(style);

function Footer() {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("dash", "bg-gray-400 mb-10")}></div>
        <div className={cx("img-box", "shadow rounded-full")}>
          <img
            src="https://res.cloudinary.com/dwoymvppw/image/upload/v1752651864/cropped_circle_image_kfiyjk.png"
            alt="Ảnh lô gô THPT Duy Tân"
          />
        </div>
        <div className={cx("content")}>
          <h4 className={cx("management-by", "fw-bold", "mb-4")}>Bản quyền thuộc về Trường THPT Duy Tân.</h4>
          <p>Địa chỉ: KP Ngọc Mỹ, Phường Quảng Phú, TP. Đà Nẵng - Điện Thoại: 0235.3841.942</p>
          <span className={cx("create-by", "flex items-center justify-center gap-2")}>
            Website được thiết kế và phát triển bởi
            <i className="fw-bold">Nguyễn Gia Hiền</i>
            <p className="italic text-gray-600">© 2025</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
