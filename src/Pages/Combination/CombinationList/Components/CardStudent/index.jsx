import classNames from "classnames/bind";
import style from "./CardStudent.module.scss";
import { formatDayOfBirth, typeBadge } from "../../../../../utils";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_ENDPOINT } from "../../../../../constants";

const cx = classNames.bind(style);

function CardStudent({ data = {}, resp = "pc", setSubmittedList = () => {} }) {
  const [saved, setSaved] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    setSaved(data.favourite);
  }, [data]);

  const handleSaveDoc = (docId) => {
    setSaved((prev) => !prev);
    saved
      ? toast
          .promise(
            axios.post(API_ENDPOINT + "/combination/unsave", { docId: docId }),
            {
              loading: "Đang gỡ lưu hồ sơ...",
              success: <b>Gỡ lưu thành công!</b>,
              error: <b>Gỡ lưu thất bại.</b>,
            }
          )
          .then(() =>
            setSubmittedList((prev) =>
              prev.map((item) => {
                if (item.id === docId) {
                  return { ...item, favourite: false };
                } else return item;
              })
            )
          )
      : toast
          .promise(
            axios.post(API_ENDPOINT + "/combination/save", { docId: docId }),
            {
              loading: "Đang lưu hồ sơ...",
              success: <b>Lưu thành công!</b>,
              error: <b>Lưu thất bại.</b>,
            }
          )
          .then(() =>
            setSubmittedList((prev) =>
              prev.map((item) => {
                if (item.id === docId) {
                  return { ...item, favourite: true };
                } else return item;
              })
            )
          );
  };
  return (
    <div className={cx("wrapper", "shadow", resp)}>
      <div className="d-flex position-relative">
        <div className={cx("d-flex flex-column col-md-4")}>
          <img
            src={data.avatar}
            alt={data.fullName}
            className={cx("img-student", "border border-dark-subtle")}
          />
        </div>
        <div className={cx("col-md-8 px-0 position-relative")}>
          <div className={cx("card-body pt-2 pb-3 px-2")}>
            <div className={cx("name-status", "mb-2")}>
              <p className={cx("m-0")}>Họ và tên:</p>
              <h6 className={cx("card-title", "m-0")} title={data.fullName}>
                {data.fullName}
              </h6>
            </div>

            <div className={cx("details")}>
              <span className={cx("d-flex", "align-items-center", "main")}>
                <p
                  className={cx("mb-0 me-2")}
                  title={"Giới tính: " + data.gender}
                >
                  {data.gender}
                </p>
                •
                <p
                  className={cx("mb-0 mx-2")}
                  title={"Ngày sinh: " + formatDayOfBirth(data.dayOfBirth)}
                >
                  {formatDayOfBirth(data.dayOfBirth)}
                </p>
                •
                <p
                  className={cx("mb-0 ms-2", "nation-detail")}
                  title={"Dân tộc: " + data.nation}
                >
                  {data.nation}
                </p>
              </span>
              <span title={"Nguyện vọng 1: " + data.combination1}>
                Nguyện vọng 1: {data.combination1}
              </span>
              <span title={"Nguyện vọng 2: " + data.combination2}>
                Nguyện vọng 2: {data.combination2}
              </span>
              <span
                className={cx("time")}
                title={"Đăng ký lúc: " + data.registeredAt}
              >
                {data.registeredAt}
              </span>
            </div>
            <button
              type="button"
              className={cx(
                "btn mt-4 fs-4 text-white border-none",
                "btn-checkinfo"
              )}
              onClick={() => navigator("/combination/detail/" + data.userId)}
            >
              Xem thông tin
            </button>
          </div>
          {/* chưa xử lý lưu riêng biệt */}
          <span
            className={cx("badge", "badge-" + data.status, "position-absolute")}
            title="Trạng thái"
            style={{ top: 8, right: 8, position: "absolute" }}
          >
            {typeBadge(data.status).title}
          </span>
        </div>
        <FontAwesomeIcon
          icon={faBookmark}
          onClick={() => handleSaveDoc(data.id)}
          className={cx("bookmark", { saved: saved })}
          title={saved ? "Gỡ lưu hồ sơ" : "Lưu hồ sơ"}
        />
      </div>
    </div>
  );
}

export default CardStudent;
