import classNames from "classnames/bind";
import style from "./ModalAddClass.module.scss";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../../../../Components/Loading";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../../../../constants";

const cx = classNames.bind(style);

const priorityOptions = [
  { title: "Tổ hợp 1", value: "Tổ hợp 1" },
  { title: "Tổ hợp 2", value: "Tổ hợp 2" },
  { title: "Tổ hợp 3", value: "Tổ hợp 3" },
  { title: "Tổ hợp 4", value: "Tổ hợp 4" },
  { title: "Tổ hợp 5", value: "Tổ hợp 5" }
];

function ModalAddClass({
  show = false,
  setShow = () => {},
  setUpdateModal = () => {},
  isUpdate = false,
  data = {},
  setDataClassesPage = () => {}
}) {
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [combination1, setCombination1] = useState("");
  const [combination2, setCombination2] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (!data.id) return;
    setClassName(data.name);
    setCombination1(data.combination1);
    setCombination2(data.combination2);
    setTeacher(data.teacher);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className.trim() || !teacher.trim() || !combination1 || !combination2) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (combination1 === combination2) {
      setError("Hai tổ hợp ưu tiên không được trùng nhau.");
      return;
    }
    setError("");
    setIsValidated(true);
    setIsLoadingModal(true);
    const dataClass = {
      name: className,
      teacher: teacher,
      combination1: combination1,
      combination2: combination2
    };
    toast
      .promise(axios.post(isUpdate ? API_ENDPOINT + "/ad/classes/update/" + data.id : API_ENDPOINT + "/ad/classes/create", dataClass), {
        loading: "Đang tạo...",
        success: <b>{isUpdate ? "Cập nhật" : "Tạo"} thành công!</b>,
        error: <b>{isUpdate ? "Cập nhật" : "Tạo"} thất bại.</b>
      })
      .then((res) => {
        setIsLoadingModal(false);
        setUpdateModal({
          bol: false
        });
        setShow(false);
        setDataClassesPage((prev) => {
          if (isUpdate) {
            return {
              ...prev,
              classes: prev.classes.map((item) => {
                return item.id === data?.id ? res.data.docAfter : item;
              })
            };
          } else {
            return { ...prev, classes: [...prev.classes, res.data.docAfter] };
          }
        });
        navigator(0);
      });
  };
  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit} validated={isValidated}>
        <Modal.Header>
          <Modal.Title>Thêm lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="px-4 mt-4 text-center">
            Nhập đầy đủ thông tin để {isUpdate ? "cập nhật lớp học" : "tạo lớp học mới"} và lưu vào hệ thống quản lý.
          </h2>
        </Modal.Body>
        <Modal.Body className="position-relative p-4">
          <Form.Group className="mb-3">
            <Form.Label>Tên lớp học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên lớp học"
              className={cx("v-inp")}
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giáo viên chủ nhiệm</Form.Label>
            <Form.Control
              type="text"
              className={cx("text-capitalize", "v-inp")}
              placeholder="Nhập tên giáo viên chủ nhiệm"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tổ hợp ưu tiên 1</Form.Label>
            <Form.Select className={cx("v-inp")} value={combination1} onChange={(e) => setCombination1(e.target.value)}>
              <option value="">Chọn tổ hợp ưu tiên</option>
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tổ hợp ưu tiên 2</Form.Label>
            <Form.Select className={cx("v-inp")} value={combination2} onChange={(e) => setCombination2(e.target.value)}>
              <option value="">Chọn tổ hợp ưu tiên</option>
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          {isLoadingModal && (
            <Loading
              title={isUpdate ? "Đang cập nhật" : "Đang tạo lớp"}
              height="100%"
              position="absolute"
              color="rgb(244 244 244)"
              zIndex="9998"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setUpdateModal({ bol: false });
              setShow(false);
            }}
            className="fs-3"
          >
            Huỷ
          </Button>
          <Button variant="primary" type="submit" className="fs-3">
            {isUpdate ? "Cập nhật" : "Tạo lớp"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalAddClass;
