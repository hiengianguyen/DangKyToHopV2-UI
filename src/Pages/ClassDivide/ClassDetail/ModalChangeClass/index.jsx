import Modal from "react-bootstrap/esm/Modal";
import CardStudent from "../CardStudent";
import InputHadValue from "../../../Combination/Component/InputHadValue";
import Select from "../../../Combination/Component/Select";
import Button from "react-bootstrap/esm/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../../../../constants";

function ModalChangeClass({ onHide = () => {}, student = {}, classDetail = {}, setStudents = () => {} }) {
  const formChangeClass = useRef();
  const [form, setForm] = useState();

  useEffect(() => {
    setForm(formChangeClass.current);
  }, []);
  const handleChangeClass = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    toast
      .promise(
        axios.post(API_ENDPOINT + "/ad/class/change", {
          newClass: data.className,
          studentId: student.id
        }),
        {
          loading: "Đang tiến hành chuyển lớp...",
          success: <b>Chuyển lớp thành công!</b>,
          error: <b>Chuyển lớp thất bại.</b>
        }
      )
      .then(() => {
        onHide(false);
        setStudents((prev) => {
          return prev.filter((item) => item.id !== student.id);
        });
      });
  };
  return (
    <Modal size="lg" show onHide={() => onHide(false)} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="fs-2">
          Thay đổi lớp học cho học sinh
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <div className="w-2/3">
            <CardStudent data={student} main />
          </div>
        </div>
        <form ref={formChangeClass}>
          <div className="flex items-center mx-10">
            <InputHadValue label="Từ lớp" value={classDetail.name} />
            <img src="/right-arrow.png" alt="" className="w-40 h-20 mx-10 user-select-none pointer-events-none" />
            <Select
              name="className"
              label="Sang lớp"
              opts={[
                {
                  title: "10/1",
                  value: "10/1"
                },
                {
                  title: "10/2",
                  value: "10/2"
                },
                {
                  title: "10/3",
                  value: "10/3"
                },
                {
                  title: "10/4",
                  value: "10/4"
                },
                {
                  title: "10/5",
                  value: "10/5"
                },
                {
                  title: "10/6",
                  value: "10/6"
                },
                {
                  title: "10/7",
                  value: "10/7"
                },
                {
                  title: "10/8",
                  value: "10/8"
                }
              ].filter((item) => item.title !== classDetail.name)}
            />
          </div>
        </form>
        <div className="my-10 px-10">
          <p className="fs-3 fw-bolder mb-2">📝 Lưu ý khi thực hiện chuyển lớp cho học sinh:</p>
          <ol className="list-decimal fs-4 text-justify px-10">
            <li>Việc chuyển lớp chỉ áp dụng trong giai đoạn xét, sắp xếp lớp học, chưa phải khi học sinh đã chính thức vào học.</li>

            <li>Kiểm tra kỹ thông tin học sinh (họ tên, mã học sinh, lớp hiện tại, ...) trước khi thực hiện để tránh sai sót.</li>

            <li>Chỉ thực hiện chuyển lớp khi có lý do hợp lý và được Ban giám hiệu hoặc Ban tuyển sinh phê duyệt.</li>

            <li>Sau khi chuyển, học sinh sẽ tự động được cập nhật vào danh sách lớp mới và xóa khỏi danh sách lớp cũ.</li>

            <li>Cần thông báo và xác nhận với giáo viên chủ nhiệm hai lớp (cũ và mới) trước khi hoàn tất thao tác.</li>

            <li>Thao tác này ảnh hưởng đến sĩ số, thống kê và việc phân chia lớp, nên cần thực hiện cẩn trọng.</li>
          </ol>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="fs-3" onClick={() => onHide(false)} variant="secondary">
          Huỷ
        </Button>
        <Button className="fs-3" onClick={handleChangeClass}>
          Xác Nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalChangeClass;
