import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import style from "./generator1.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_ENDPOINT } from "../../../../../constants";
const cx = classNames.bind(style);

function Generator1({
  show = true,
  data = {},
  btnText = "Tạo thông báo",
  isUpdate = false,
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    if (data === undefined || JSON.stringify(data) === "{}") return;

    setTitle(data.title);
    setMessage(data.message);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate
    if (title.length < 10 || title.length > 130) {
      setError("Tiêu đề phải từ 10 đến 130 ký tự.");
      return;
    }
    if (message.length < 100) {
      setError("Nội dung phải từ 100 ký tự trở lên.");
      return;
    }
    setError("");
    const dataPost = { title, message };
    toast
      .promise(
        axios.post(
          isUpdate
            ? API_ENDPOINT + "/notification/update-noti/" + data.id
            : API_ENDPOINT + "/notification/create-noti/",
          dataPost
        ),
        {
          loading: "Đang tiến hành...",
          success: <b>Thành công!</b>,
          error: <b>Thất bại.</b>,
        }
      )
      .then(() => navigator("/notifications"));
  };

  return (
    <div
      className={cx("boxSubmit1")}
      style={{ display: show ? "block" : "none" }}
    >
      <Form className={cx("createNotiForm")} onSubmit={handleSubmit}>
        <Form.Group className={cx("formGroup")}>
          <Form.Label htmlFor="signin-phone">Tiêu đề thông báo (*):</Form.Label>
          <Form.Control
            type="text"
            id="signin-phone"
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
          <Form.Label htmlFor="noti-message">
            Nội dung thông báo (*):
          </Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            id="noti-message"
            className={cx("notiInput")}
            required
            minLength={100}
            placeholder="Nội dung thông báo"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
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

export default Generator1;
