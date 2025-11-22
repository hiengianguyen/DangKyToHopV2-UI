import classNames from "classnames/bind";
import style from "../PathItems.module.scss";
import { useAuth } from "../../../../../../Contexts/AuthContext";
import Dash from "../../../../../Dash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PushSidebarContext } from "../..";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../../../../../constants";

const cx = classNames.bind(style);

function EndBox({ currRouter, onChangeRoute = () => {} }) {
  const pushSidebar = useContext(PushSidebarContext);
  const navigator = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    axios.get(API_ENDPOINT + "/auth/signout").then((axiosData) => {
      if (axiosData.data.isSuccess) {
        logout();
        navigator("/auth/signin");
      }
    });
  };

  const handleNavigator = (path) => {
    onChangeRoute(path);
    navigator(path);
  };

  return (
    <>
      <div className={cx("end-box")}>
        <li
          title={auth?.user?.fullName}
          className={
            cx("box", "avatar", {
              active: "/profile" === currRouter,
            }) +
            (!pushSidebar.isPush ? " ps-0 d-flex justify-content-center" : "")
          }
          onClick={() => handleNavigator("/profile")}
          value="profile"
        >
          <img
            src={auth?.user?.avatar}
            className={!pushSidebar.isPush ? "me-0" : null}
            alt=""
          />
          <p
            className={cx("m-0", "text", "text-black", {
              show: pushSidebar.isPush,
            })}
          >
            {auth?.user?.fullName}
          </p>
        </li>
        <li
          title="Đăng xuất"
          className={cx("box", "logout", "gap-4", "my-1", "mt-2")}
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faPowerOff} className="" />
          <p className={cx("text", "m-0", { show: pushSidebar.isPush })}>
            Đăng xuất
          </p>
        </li>
      </div>
      <Dash height="1px" />
      <div className={cx("show-sidebar")}>
        <div title="Thu nhỏ bảng điều hướng" className={cx("p-0")}>
          <li
            title="Điều hướng"
            onClick={() => pushSidebar.onPush((prev) => !prev)}
            className={
              cx("box", "redirect", "mb-1", "btn-push-sidebar") +
              (!pushSidebar.isPush ? " ps-0 d-flex justify-content-center" : "")
            }
          >
            <p className={cx("text", "m-0", { show: pushSidebar.isPush })}>
              Thu nhỏ bảng điều hướng
            </p>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={cx("icon-push-sidebar", {
                active: !pushSidebar.isPush,
              })}
            />
          </li>
        </div>
      </div>
    </>
  );
}

export default EndBox;
