import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Badge from "react-bootstrap/Badge";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../../../constants";

function ModalDeleteClass({ show = false, setShowDeleteModal = () => {}, setClasses = () => {}, classInfo = {} }) {
  const [count, setCount] = useState(10);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (classInfo.studentCount === 0) {
      setCount(0);
    }
  }, [classInfo]);

  useEffect(() => {
    if (show) {
      setDisabled(true);
    }
  }, [show]);

  useEffect(() => {
    if (show && count > 0) {
      const timerId = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setDisabled(false);
    }
  }, [count, show]);

  const handleDeleteClass = disabled
    ? () => {}
    : () => {
        toast
          .promise(
            axios.post(classInfo.studentCount !== 0 ? API_ENDPOINT + "/ad/classes/delete/m" : API_ENDPOINT + "/ad/classes/delete", {
              id: classInfo.id
            }),
            {
              loading: "Đang xoá lớp...",
              success: <b>Xoá thành công!</b>,
              error: <b>Xoá thất bại.</b>
            }
          )
          .then(() => {
            setShowDeleteModal({ bol: false });
            setClasses((prev) => {
              return {
                ...prev,
                classes: prev.classes.filter((item) => item.id !== classInfo.id)
              };
            });
          });
      };

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title className="fs-1">Xoá lớp học</Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4 fs-2">
        Bạn có muôn xoá lớp học <Badge bg="secondary">{classInfo.name}</Badge> ?
        {classInfo.studentCount ? (
          <div className="my-10 px-10">
            <p className="fs-3 fw-bolder mb-2">⚠️ Lưu ý khi xóa lớp học</p>
            <ol className="list-decimal fs-4 text-justify px-10">
              <li>Khi xóa lớp, tất cả học sinh trong lớp đó sẽ được đưa trở lại trạng thái “đang cần xét lớp”.</li>

              <li>Việc xóa lớp chỉ nên thực hiện khi lớp chưa chính thức được chốt hoặc bắt đầu học.</li>

              <li>Toàn bộ thông tin phân lớp, giáo viên chủ nhiệm và danh sách học sinh của lớp sẽ bị xóa khỏi hệ thống.</li>

              <li>Hành động này không thể hoàn tác, trừ khi bạn tạo lại lớp và phân học sinh thủ công.</li>

              <li>Hãy kiểm tra kỹ và xác nhận trước khi thực hiện để tránh mất dữ liệu quan trọng.</li>
            </ol>
          </div>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="fs-3" disabled={disabled} onClick={handleDeleteClass}>
          Xoá lớp {disabled ? `(${count})s` : ""}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShowDeleteModal({ bol: false });
            setCount(10);
          }}
          className="fs-3"
        >
          Huỷ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteClass;
