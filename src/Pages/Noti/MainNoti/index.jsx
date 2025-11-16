import classNames from "classnames/bind";
import style from "../Noti.module.scss";
import BoxRadius from "../../../Components/BoxRadius";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";

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

  const navigator = useNavigate();

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Thông báo";
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4001/notification").then((axiosData) => {
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
      .promise(axios.get("http://localhost:4001/notification/delete/m/" + id), {
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
          <div className={cx("text-center")}>
            <h4 className={cx("mb-2", "text-center fs-1")}>Danh sách thông báo</h4>
            <p style={{ fontSize: "16px", color: "#666" }}>
              Đây là những thông báo được gửi đến tất cả học sinh để cập nhật thông tin quan trọng về tuyển sinh và các hoạt động học tập.
            </p>
          </div>
          {role === "manager" ? (
            <div className={cx("d-flex", "justify-content-end", "container", "mb-2", "btn-gen-noti")}>
              <Link to="/notification/generator">
                <FontAwesomeIcon icon={faPlus} className="me-1" /> Tạo thông báo mới
              </Link>
            </div>
          ) : null}
          <div className={cx("container", "container-noti")}>
            {notiSubmittedStatus && (
              <div className={cx("noti-box", "rounded-4")}>
                <h5 className={cx("title", "pe-4 fs-2")}>
                  <Link to={"/combination/detail"}>{notiSubmittedStatus.title}</Link>
                </h5>
                <p className={cx("timer", "mb-0")}>Tạo lúc: {notiSubmittedStatus.publishAt}</p>
              </div>
            )}
            {listNoti ? (
              listNoti.map((item, index) => (
                <div className={cx("noti-box", "rounded-4")} key={index}>
                  <h5 className={cx("title", "pe-4 fs-2")}>
                    <Link to={"/notifications/" + item.id}>{item.title}</Link>
                  </h5>
                  <p className={cx("timer", "mb-0")}>Tạo lúc: {item.publishAt}</p>
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
