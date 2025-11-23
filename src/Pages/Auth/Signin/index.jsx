import classNames from "classnames/bind";
import style from "./Signin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerLogin from "../BannerLogin";
import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Spinner from "react-bootstrap/esm/Spinner";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);

const Pc = ({ children }) => {
  const isPc = useMediaQuery({ minWidth: 1400 });
  return isPc ? children : null;
};
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1400 });
  return isDesktop ? children : null;
};

function Signin() {
  const { login, auth } = useAuth();
  const navigator = useNavigate();
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigator("/");
    }
  }, [auth]);

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Đăng nhập";
  }, []);

  const handleSubmit = (event) => {
    setIsLoading(true);
    let ok = true;
    event.preventDefault();
    if (!/^[0-9]{10}$/.test(phone)) {
      setErrorPhone("Số điện thoại phải gồm đúng 10 chữ số");
      ok = false;
    } else {
      setErrorPhone("");
    }

    if (password.length < 8) {
      setErrorPass("Mật khẩu ít nhất 8 kí tự");
      ok = false;
    } else {
      setErrorPass("");
    }

    if (ok) {
      axios
        .post(API_ENDPOINT + "/auth/signin", {
          phone: phone,
          password: password
        })
        .then((axiosData) => {
          console.log(axiosData.data);

          if (axiosData.data.isSuccess) {
            login(axiosData.data);
            if (axiosData.data.user.role === "student") {
              navigator("/combination/register");
            } else {
              navigator("/combination/submitted/list");
            }
          } else {
            setErrorPass(axiosData.data.messageError);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Pc>
        <div className={cx("box-login")}>
          <div className={cx("box")}>
            <p onClick={() => navigator("/")} title="Trang chủ" className={cx("btn-home-page")}>
              <FontAwesomeIcon icon={faArrowLeft} className="" /> Trang chủ
            </p>
            <div className={cx("title-box", "flex flex-col items-center")}>
              <img src="https://res.cloudinary.com/dwoymvppw/image/upload/v1752651864/cropped_circle_image_kfiyjk.png" alt="Duy Tân" />
              <div className={cx("content")}>
                <h2>Chào mừng!</h2>
                <p>Tạo tài khoản để đăng ký tổ hợp</p>
              </div>
            </div>
            <div id="signup" className={cx("form-container")}>
              <Form onSubmit={handleSubmit}>
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
                <Form.Group className="my-4">
                  <Form.Label>Mật khẩu:</Form.Label>
                  <Form.Control
                    isInvalid={!!errorPass}
                    className="login__input"
                    name="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    placeholder="Mật khẩu"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errorPass}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: "100%", fontSize: "16px" }}>
                  ĐĂNG NHẬP
                </Button>
                <div className={cx("login-comment")}>
                  <p>Bạn chưa có tài khoản?</p>
                  <p className={cx("btn-home-page")} onClick={() => navigator("/auth/signup")}>
                    Đăng ký
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Pc>

      <Desktop>
        <div className={cx("box-login", "desktop")}>
          <div className={cx("box")}>
            <p onClick={() => navigator("/")} title="Trang chủ" className={cx("btn-home-page")}>
              <FontAwesomeIcon icon={faArrowLeft} className="" /> Trang chủ
            </p>
            <div className={cx("title-box", "flex flex-col items-center")}>
              <img src="https://res.cloudinary.com/dwoymvppw/image/upload/v1752651864/cropped_circle_image_kfiyjk.png" alt="Duy Tân" />
              <div className={cx("content")}>
                <h2>Chào mừng!</h2>
                <p>Tạo tài khoản để đăng ký tổ hợp</p>
              </div>
            </div>
            <div id="signup" className={cx("form-container")}>
              <Form onSubmit={handleSubmit}>
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
                <Form.Group className="my-4">
                  <Form.Label>Mật khẩu:</Form.Label>
                  <Form.Control
                    isInvalid={!!errorPass}
                    className="login__input"
                    name="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    minLength={8}
                    placeholder="Mật khẩu"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errorPass}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: "100%", fontSize: "16px" }} disabled={isLoading}>
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "ĐĂNG NHẬP"
                  )}
                </Button>
                <div className={cx("login-comment", "d-flex flex-column")}>
                  <p>Bạn chưa có tài khoản?</p>
                  <p className={cx("btn-home-page")} onClick={() => navigator("/auth/signup")}>
                    Đăng ký
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Desktop>
      <BannerLogin />
    </div>
  );
}

export default Signin;
