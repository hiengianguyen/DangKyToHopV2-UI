import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import style from "./generator2.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_ENDPOINT } from "../../../../../constants";
const cx = classNames.bind(style);

function Generator2({ show = false, data = {}, btnText = "Tạo thông báo", isUpdate = false }) {
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [registeredBy, setRegisteredBy] = useState("");
  const [typeNoti, setTypeNoti] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    if (data === undefined || JSON.stringify(data) === "{}") return;

    setTitle(data.title);
    setFileUrl(data.fileUrl);
    setTypeNoti(data.typeNoti);
    setSubTitle(data.subTitle);
    setRegisteredBy(data.registeredBy);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length < 10 || title.length > 130) {
      setError("Tiêu đề phải từ 10 đến 130 ký tự.");
      return;
    }
    if (!subTitle) {
      setError("Mô tả ngắn thông báo là bắt buộc.");
      return;
    }
    if (!fileUrl) {
      setError("Đường dẫn file thông báo là bắt buộc.");
      return;
    }
    if (!registeredBy) {
      setError("Thông tin cơ quan tạo thông báo là bắt buộc.");
      return;
    }
    setError("");
    const dataPost = { title, fileUrl, subTitle, registeredBy, typeNoti };
    toast
      .promise(
        axios.post(
          isUpdate ? API_ENDPOINT + "/notification/update-noti/" + data.id : API_ENDPOINT + "/notification/create-noti/",
          dataPost
        ),
        {
          loading: "Đang cập nhật...",
          success: <b>Cập nhật thành công!</b>,
          error: <b>Cập nhật thất bại.</b>
        }
      )
      .then((axiosData) => navigator("/notifications/" + axiosData.data.id));
  };

  return (
    <div className={cx("boxSubmit2")} style={{ display: show ? "block" : "none" }}>
      <Form className={cx("createNotiForm")} onSubmit={handleSubmit}>
        <Form.Group className={cx("formGroup")}>
          <Form.Label htmlFor="title-noti">Tiêu đề thông báo (*):</Form.Label>
          <Form.Control
            type="text"
            id="title-noti"
            name="title"
            className={cx("notiInput")}
            required
            minLength={10}
            maxLength={130}
            placeholder="Tiêu đề thông báo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={cx("formGroup")}>
          <Form.Label htmlFor="signin-phone">Mô tả ngắn thông báo (*):</Form.Label>
          <Form.Control
            type="text"
            id="signin-phone"
            name="subTitle"
            className={cx("notiInput")}
            required
            minLength={10}
            maxLength={130}
            placeholder="Mô tả ngắn thông báo"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={cx("formGroup")}>
          <Form.Label htmlFor="file-url">Đường dẫn file thông báo (*):</Form.Label>
          <div className={cx("inputFileUrl")}>
            <p className={cx("mb-0", "me-2")}>https://docs.google.com/document/d/e/</p>
            <Form.Control
              type="text"
              id="file-url"
              name="fileUrl"
              className={cx("notiInput")}
              required
              placeholder="Đường dẫn file thông báo"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className={cx("formGroup")}>
          <Form.Label htmlFor="signin-phone">Tạo bởi ai (*):</Form.Label>
          <Form.Control
            type="text"
            id="signin-phone"
            name="registeredBy"
            className={cx("notiInput")}
            required
            maxLength={50}
            placeholder="Tạo bởi"
            value={registeredBy}
            onChange={(e) => setRegisteredBy(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={cx("formGroup")}>
          <Form.Label htmlFor="signin-phone">Loại thông báo (*):</Form.Label>
          <Form.Select
            id="signin-phone"
            name="typeNoti"
            className={cx("notiInput", "py-4 px-2")}
            required
            value={typeNoti}
            onChange={(e) => setTypeNoti(e.target.value)}
          >
            <option value="Tuyển sinh">Tuyển sinh</option>
            <option value="Quan trọng">Quan trọng</option>
            <option value="Hướng dẫn">Hướng dẫn</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex flex-column">
          <Link to="/notification/info" className={cx("mb-2", "btn-info-get")}>
            Cách lấy đường dẫn của file trong google docs
          </Link>
          <Form.Label>Xem trước:</Form.Label>
        </div>
        <div className={cx("fileImportReview")}>
          <h5>File thông báo</h5>
          <iframe src={fileUrl ? `https://docs.google.com/document/d/e/${fileUrl}` : null} width="100%" height="900" title="Preview" />
        </div>
        {error && <span className={cx("formMessage")}>{error}</span>}
        <div className={cx("flexEnd")}>
          <Button variant="primary" type="submit" className="fs-3">
            {btnText}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Generator2;
