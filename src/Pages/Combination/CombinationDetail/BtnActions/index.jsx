import classNames from "classnames/bind";
import style from "./BtnActions.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import toast from "react-hot-toast";
import { getTemplateId } from "../../../../utils";
import { API_ENDPOINT } from "../../../../constants";

const cx = classNames.bind(style);

function BtnActions({ userId = "", disabled = false, keyPage = "1" }) {
  const { auth } = useAuth();

  const handleReject = (userId) => {
    if (disabled) return;
    toast.promise(axios.post(API_ENDPOINT + "/combination/submited-reject/" + userId), {
      loading: "Đang huỷ phê duyệt...",
      success: <b>Huỷ phê duyệt thành công!</b>,
      error: <b>Huỷ phê duyệt thất bại.</b>
    });
  };

  const handleApprove = (userId) => {
    if (disabled) return;
    toast.promise(axios.post(API_ENDPOINT + "/combination/submited-approve/" + userId), {
      loading: "Đang phê duyệt...",
      success: <b>Phê duyệt thành công!</b>,
      error: <b>Phê duyệt thất bại.</b>
    });
  };

  const handleRedirectPDF = () => {
    if (Number(keyPage) < 3) {
      window.open("/file/pdf/submited/" + userId + "?template=" + getTemplateId(keyPage), "_blank");
    } else {
      toast("Chức năng đang hoàn thiện...", {
        icon: "💙"
      });
    }
  };
  return (
    <div>
      <Row className={cx("btnFeature", "mt-4")}>
        {auth?.user?.role === "student" ? (
          <>
            <Col xs={"auto"}>
              <Link
                to="/combination/submit-combination?step=2"
                className={cx("btnAction", "btn", "btn-secondary", {
                  disabled: disabled
                })}
              >
                Chỉnh sửa
              </Link>
            </Col>
            <Col xs={"auto"}>
              <button
                type="button"
                id="btn-modal-delete"
                className={cx("btnAction", "btn", "btn-danger", {
                  disabled: disabled
                })}
              >
                Xoá hồ sơ
              </button>
            </Col>
            <Col xs={"auto"}>
              <p onClick={handleRedirectPDF} className={cx("btnAction", "btn", "btn-info")} target="_blank">
                Hồ sơ PDF
              </p>
            </Col>
          </>
        ) : (
          <>
            <Col xs={"auto"}>
              <p onClick={handleRedirectPDF} className={cx("btnAction", "btn", "btn-info")} target="_blank">
                Hồ sơ PDF
              </p>
            </Col>
            <Col xs={"auto"}>
              <button
                className={cx("btnAction", "btn", "btn-danger", {
                  disabled: disabled
                })}
                type="button"
                onClick={() => handleReject(userId)}
              >
                Không phê duyệt
              </button>
            </Col>
            <Col xs={"auto"}>
              <button
                className={cx("btnAction", "btn", "btn-primary", {
                  disabled: disabled
                })}
                type="button"
                onClick={() => handleApprove(userId)}
              >
                Phê duyệt
              </button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export default BtnActions;
