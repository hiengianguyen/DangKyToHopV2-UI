import classNames from "classnames/bind";
import style from "./Main.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BoxRadius from "../../../Components/BoxRadius";
import Loading from "../../../Components/Loading";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);
axios.defaults.withCredentials = true;

function Main() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userNavigator = useNavigate();

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Trang cá nhân";
  }, []);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/me/profile").then((axiosData) => {
      if (axiosData.data.isSuccess) {
        setUser(axiosData.data.user);
        setIsLoading(false);
      } else {
        userNavigator("/auth/signin");
      }
    });
  }, [userNavigator]);
  return (
    <BoxRadius>
      {isLoading && <Loading title="Đang tải trang cá nhân" />}
      <div
        className={cx("d-flex", "align-items-between", "justify-content-start")}
      >
        <h4 className={cx("mb-0")}>Trang cá nhân</h4>
      </div>
      <div
        className={cx(
          "mb-3",
          "d-flex",
          "justify-content-center",
          "align-items-center"
        )}
      >
        <div className={cx("card-body-profile", "my-4")}>
          <div
            className={cx(
              "info-top",
              "containers",
              "mb-3",
              "d-flex",
              "justify-content-center",
              "align-items-center"
            )}
          >
            <img
              className={cx("profile-img-user", "mt-2")}
              src={user.avatar}
              alt="User"
            />
          </div>
          <div className={cx("info", "profile-dad-name")}>
            <div className={cx("info-sub", "mt-10", "containers")}>
              <div className={cx("profile-dad-name", "mb-2")}>
                <label
                  htmlFor="profile-name-input"
                  className={cx("form-label-profile")}
                >
                  Họ và tên:
                </label>
                <h4 className={cx("profile-name-user")}>{user.fullName}</h4>
              </div>
              <div className={cx("info-bt", "mb-3")}>
                <label
                  htmlFor="profile-phone-input"
                  className={cx("form-label-profile")}
                >
                  Số điện thoại:
                </label>
                <p className={cx("profile-phone-user", "mb-2")}>{user.phone}</p>
              </div>
            </div>
            <div className={cx("btn-edit", "d-flex")}>
              <div
                onClick={() => userNavigator("/profile/edit")}
                className={cx("btn", "btn-secondary", "btn-lg")}
              >
                Chỉnh sửa
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoxRadius>
  );
}

export default Main;
