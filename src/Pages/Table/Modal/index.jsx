import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
import style from "./ModalEditTable.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { API_ENDPOINT } from "../../../constants";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

function ModalEditTable({ isShow = false, setShow = () => {}, combination = {}, setCombinations = () => {} }) {
  const handleClose = () => setShow(false);
  const [optionalSubject1, setOptionalSubject1] = useState("");
  const [optionalSubject2, setOptionalSubject2] = useState("");
  const [optionalSubject3, setOptionalSubject3] = useState("");
  const [optionalSubject4, setOptionalSubject4] = useState("");
  const [compulsorySubject1, setCompulsorySubject1] = useState("");
  const [compulsorySubject2, setCompulsorySubject2] = useState("");
  const [compulsorySubject3, setCompulsorySubject3] = useState("");
  const [classCount, setClassCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (!combination) return;

    setOptionalSubject1(combination.optionalSubjects ? combination.optionalSubjects[0] || "" : "");
    setOptionalSubject2(combination.optionalSubjects ? combination.optionalSubjects[1] || "" : "");
    setOptionalSubject3(combination.optionalSubjects ? combination.optionalSubjects[2] || "" : "");
    setOptionalSubject4(combination.optionalSubjects ? combination.optionalSubjects[3] || "" : "");

    setCompulsorySubject1(combination.compulsorySubjects ? combination.compulsorySubjects[0] || "" : "");
    setCompulsorySubject2(combination.compulsorySubjects ? combination.compulsorySubjects[1] || "" : "");
    setCompulsorySubject3(combination.compulsorySubjects ? combination.compulsorySubjects[2] || "" : "");

    setClassCount(combination.classesCount ?? "");
  }, [combination]);

  const handleSubmit = (id) => {
    setIsLoading(true);
    const data = {
      compulsorySubjects: [compulsorySubject1, compulsorySubject2, compulsorySubject3],
      optionalSubjects: [optionalSubject1, optionalSubject2, optionalSubject3, optionalSubject4],
      classesCount: classCount
    };

    toast
      .promise(axios.post(API_ENDPOINT + "/combination/update/" + id, data), {
        loading: "Đang tiến hành...",
        success: <b>Thành công!</b>,
        error: <b>Thất bại.</b>
      })
      .then((res) => {
        setCombinations((prev) => {
          return { ...prev, combinations: prev.combinations.map((item) => (item.id === id ? res.data.docAfter : item)) };
        });
        navigator(0);
      })
      .finally(() => {
        setIsLoading(false);
        setShow(false);
      });
  };

  return (
    <Modal show={isShow} onHide={handleClose} className={cx("wrapper")}>
      {isLoading && <Loading title="Đang cập nhật dữ liệu tổ hợp" />}
      <Modal.Header closeButton>
        <Modal.Title className="fs-2">Chỉnh sửa tổ hợp</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <h2 className={cx("modalTitle", "mb-3")}>{combination.name}</h2>
        <h6 className={cx("cardTitle")}>Môn lựa chọn (04 môn)</h6>
        <ol>
          <li>
            <input type="text" onChange={(e) => setOptionalSubject1(e.target.value)} value={optionalSubject1} name="optionalSubjects" />
          </li>
          <li>
            <input type="text" onChange={(e) => setOptionalSubject2(e.target.value)} value={optionalSubject2} name="optionalSubjects" />
          </li>
          <li>
            <input type="text" onChange={(e) => setOptionalSubject3(e.target.value)} value={optionalSubject3} name="optionalSubjects" />
          </li>
          <li>
            <input type="text" onChange={(e) => setOptionalSubject4(e.target.value)} value={optionalSubject4} name="optionalSubjects" />
          </li>
        </ol>
        <h6 className={cx("cardTitle")}>Cụm chuyên đề (03 môn)</h6>
        <ol>
          <li>
            <input
              type="text"
              onChange={(e) => setCompulsorySubject1(e.target.value)}
              value={compulsorySubject1}
              name="compulsorySubjects"
            />
          </li>
          <li>
            <input
              type="text"
              onChange={(e) => setCompulsorySubject2(e.target.value)}
              value={compulsorySubject2}
              name="compulsorySubjects"
            />
          </li>
          <li>
            <input
              type="text"
              onChange={(e) => setCompulsorySubject3(e.target.value)}
              value={compulsorySubject3}
              name="compulsorySubjects"
            />
          </li>
        </ol>
        <div className={cx("d-flex align-items-center gap-3")}>
          <h6 className={cx("cardTitle", "classCount")}>Số lớp:</h6>
          <input type="number" value={classCount} onChange={(e) => setClassCount(e.target.value)} step="1" min="1" name="classesCount" />
        </div>
      </Modal.Body>
      <Modal.Footer className={cx("footer")}>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={() => handleSubmit(combination.id)}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditTable;
