import classNames from "classnames/bind";
import style from "../Noti.module.scss";
import BoxRadius from "../../../Components/BoxRadius";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Links, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import { API_ENDPOINT } from "../../../constants";
import { useAuth } from "../../../Contexts/AuthContext";

const cx = classNames.bind(style);

function MainNoti() {
  const [listNoti, setListNoti] = useState([]);
  const [notiSubmittedStatus, setNotiSubmittedStatus] = useState({});
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showListAction, setShowListAction] = useState(false);
  const [listAction, setListAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [notiDelete, setNotiDelete] = useState("");
  const { auth } = useAuth();

  const navigator = useNavigate();

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Thông báo";
  }, []);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/notification?role=" + auth.user.role).then((axiosData) => {
      if (axiosData.data.isSuccess) {
        setListNoti(axiosData.data.notifications);
        setNotiSubmittedStatus(axiosData.data.notiSubmittedStatus);
        setRole(axiosData.data.role);
        setLoading(false);
      } else {
        navigator("/auth/signin");
      }
    });
  }, [navigator]);

  const deleteNoti = (id) => {
    toast
      .promise(axios.get(API_ENDPOINT + "/notification/delete/m/" + id), {
        loading: "Đang xoá...",
        success: <b>Xoá thành công!</b>,
        error: <b>Xoá thất bại.</b>
      })
      .then((axiosData) => {
        setListNoti((prev) => prev.filter((item) => item.id !== id));
        if (axiosData.data.type === "auth") {
          navigator("/auth/signin");
        }
      })
      .finally(() => setShowModal(false));
  };
  return (
    <BoxRadius>
      {loading && <Loading title="Đang tải thông báo" />}
      <div className={cx("card-body", "p-0")}>
        <div className={cx("content")}>
          <div className={cx("text-center mb-4")}>
            <h4 className={cx("mb-2", "text-center fs-1 fw-bold")}>Bảng Tin Thông Báo</h4>
            <p style={{ fontSize: "20px", color: "#666" }}>Cập nhật tin tức tuyển sinh và hoạt động học tập mới nhất</p>
          </div>
          {role === "manager" ? (
            <div className={cx("d-flex", "justify-content-end", "container", "mb-4", "btn-gen-noti")}>
              <Link to="/notification/generator" className="btn btn-primary text-white fs-2">
                <FontAwesomeIcon icon={faPlus} className="me-1" /> Tạo thông báo mới
              </Link>
            </div>
          ) : null}
          <div className={cx("container", "container-noti")}>
            {(auth.user.role !== "manager" || JSON.stringify(notiSubmittedStatus) !== "{}") &&
              (notiSubmittedStatus.typeNoti === "approved" ? (
                <div
                  className={cx("flex items-center p-8 gap-8 mb-12 rounded-4 bg-green-50", "box-submitted-noti", {
                    success: notiSubmittedStatus.typeNoti === "approved"
                  })}
                >
                  <div className="rounded-full bg-white shadow-sm p-2 flex justify-center items-center">
                    <svg className="size-14 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="fw-bold text-emerald-900">Chúc mừng! Hồ sơ của bạn đã được phê duyệt</h1>
                    <span className="text-emerald-700">
                      Hồ sơ đăng ký tuyển sinh của bạn đã đáp ứng đủ điều kiện. Vui lòng xem hướng dẫn nhập học chi tiết ở website của{" "}
                      <b className="text-emerald-800">trường THPT Duy Tân</b>
                    </span>
                  </div>
                  <Link to={"/combination/detail"} className="btn btn-success text-white fs-4 fw-bold">
                    Xem thông tin trạng thái
                  </Link>
                </div>
              ) : (
                <div className={cx("flex items-center p-8 gap-8 mb-12 rounded-4 bg-red-50", "box-submitted-noti")}>
                  <div className="rounded-full bg-white shadow-sm p-2 flex justify-center items-center">
                    <svg className="size-14 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="fw-bold text-red-900">Yêu cầu bổ sung hồ sơ</h1>
                    <span className="text-red-700">
                      Hồ sơ của bạn còn thiếu một số thông tin quan trọng. Vui lòng cập nhật trước ngày{" "}
                      <b className="text-red-800">30/11/2025</b> để được tiếp tục xét duyệt.
                    </span>
                  </div>
                  <Link to={"/combination/detail"} className="btn btn-danger text-white fs-4 fw-bold">
                    Xem thông tin trạng thái
                  </Link>
                </div>
              ))}
            {listNoti ? (
              listNoti.map((item, index) => (
                <div
                  className={cx(
                    "noti-box",
                    "bg-white rounded-xl p-4 sm:p-6 group shadow border-s-4 border-gray-100 hover:shadow-md hover:border-blue-600 transition-all cursor-pointer"
                  )}
                  key={index}
                >
                  <div className="flex gap-4 mb-4">
                    <span
                      className={
                        "px-2.5 py-0.5 rounded-full font-semibold border " +
                        (item.typeNoti === "Quan trọng"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : item.typeNoti === "Tuyển sinh"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-gray-100 text-gray-600 border-gray-200")
                      }
                    >
                      {item.typeNoti}
                    </span>
                    <span className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCalendar} className="size-6" /> {item.publishAt}
                    </span>
                    <span className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faUser} className="size-6" />
                      {item.registeredBy}
                    </span>
                  </div>
                  <h5 className={cx("title", "pe-4 fw-bold fs-2 mb-2 texr-back group-hover:text-blue-600 transition-all")}>
                    <Link to={"/notifications/" + item.id}>{item.title}</Link>
                  </h5>
                  <span>{item.subTitle}</span>
                  {role === "manager" ? (
                    <div
                      className={cx("list-icon")}
                      onClick={() => {
                        setListAction(item.id);
                        setShowListAction((prev) => !prev);
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="ellipsis"
                        className="svg-inline--fa fa-ellipsis "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                        ></path>
                      </svg>
                      {showListAction && (
                        <ul
                          className={cx("opt-noti", "shadow", {
                            hidden: listAction !== item.id
                          })}
                        >
                          <Link to={"/notifications/edit/" + item.id}>
                            <li>Chỉnh sửa</li>
                          </Link>
                          <li
                            onClick={() => {
                              setShowModal(true);
                              setNotiDelete(item.id);
                            }}
                          >
                            Xoá
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className={cx("img-box-not-noti", "mt-4", "d-flex", "align-items-center", "flex-column")}>
                <img src="https://res.cloudinary.com/dwoymvppw/image/upload/v1752162309/error_xpgplu.png" alt="not data" />
                <div className={cx("text-center")}>
                  <h6>Chưa có thông báo</h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={setShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá thông báo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Bạn có muốn xoá thông báo này.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" className="fs-3" onClick={() => setShowModal(false)}>
            Huỷ
          </Button>
          <Button variant="danger" className="fs-3" onClick={() => deleteNoti(notiDelete)}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </BoxRadius>
  );
}

export default MainNoti;
