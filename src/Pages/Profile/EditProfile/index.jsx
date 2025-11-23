import classNames from "classnames/bind";
import style from "../Main/Main.module.scss";
import BoxRadius from "../../../Components/BoxRadius";

import "cropperjs/dist/cropper.css";
import { useState } from "react";
import CropAvatar from "./CropAvatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import ImgCropped from "./ImgCropped";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);

function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [imgCropped, setImgCropped] = useState("");
  const [imgDefault, setImgDefault] = useState("");
  const [user, setUser] = useState({});
  const userNavigator = useNavigate();
  const { auth, login } = useAuth();

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Chỉnh sửa trang cá nhân";
  }, []);

  const handleChangeImg = (files) => {
    const file = files[0];
    if (file) {
      const lastImageURL = URL.createObjectURL(file);
      setImgDefault(lastImageURL);
    }
  };

  useEffect(() => {
    setImgDefault(user.avatar);
    setFullName(user.fullName);
    setPhone(user.phone);
  }, [user]);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/me/profile").then((axiosData) => {
      if (axiosData.data.isSuccess) {
        setUser(axiosData.data.user);
      } else {
        userNavigator("/auth/signin");
      }
    });
  }, [userNavigator]);

  useEffect(() => {
    setErrorFullName("");
    setErrorPhone("");
  }, [fullName, phone]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let ok = true;

    if (fullName.length === 0 || fullName.length <= 4) {
      setErrorFullName("Vui lòng nhập Họ và tên (Hơn 4 kí tự)");
      ok = false;
    } else {
      setErrorFullName("");
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setErrorPhone("Số điện thoại phải gồm đúng 10 chữ số");
      ok = false;
    } else {
      setErrorPhone("");
    }

    if (ok) {
      const user = localStorage.getItem("user");
      const userId = auth?.user?.userId || JSON.parse(user).userId;
      axios
        .post(API_ENDPOINT + `/me/profile/update?userId=${userId}`, {
          fullName: fullName,
          avatar: imgCropped,
          phone: phone
        })
        .then((axiosData) => {
          if (axiosData.data.isSuccess) {
            login(axiosData.data.auth);
            userNavigator("/profile");
          } else {
            setErrorPhone(axiosData.data.message);
          }
        });
    }
  };

  return (
    <BoxRadius>
      <div className={cx("d-flex", "align-items-between", "justify-content-start")}>
        <h4 className={cx("mb-0")}>Chỉnh sửa trang cá nhân</h4>
      </div>
      <div className={cx("mb-3", "d-flex", "justify-content-center", "align-items-center")}>
        <div className={cx("card-body-profile", "my-4")}>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center gap-4 mb-4">
              <CropAvatar imgUrl={imgDefault} onChangeImg={setImgCropped} />
              <ImgCropped imgUrl={imgCropped} />
            </div>
            <Form.Group className="my-4">
              <Form.Control type="file" onChange={(e) => handleChangeImg(e.target.files)} style={{ width: "15pc", fontSize: "16px" }} />
            </Form.Group>
            <div className={cx("profile-dad-name", "info", "mt-8", "flex-column-reverse")}>
              <Form.Group className="my-4">
                <Form.Label>Họ và tên:</Form.Label>
                <Form.Control
                  isInvalid={!!errorFullName}
                  className="login__input"
                  name="fullName"
                  defaultValue={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Họ và tên"
                  required
                />
                <Form.Control.Feedback type="invalid">{errorFullName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Số điện thoại:</Form.Label>
                <Form.Control
                  isInvalid={!!errorPhone}
                  className="login__input"
                  name="phoneNumber"
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  minLength={10}
                  placeholder="Số điện thoại liên hệ"
                  required
                />
                <Form.Control.Feedback type="invalid">{errorPhone}</Form.Control.Feedback>
              </Form.Group>

              <div className={cx("btn-edit", "d-flex", "justify-content-end", "mt-4")}>
                <Button variant="success" type="submit" style={{ fontSize: "16px" }}>
                  Cập nhật
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </BoxRadius>
  );
}

export default EditProfile;
