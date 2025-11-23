import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import { API_ENDPOINT } from "../../../../constants";

function ModalRejectStudent({ setStudents = () => {}, setShowModal = () => {}, data = {} }) {
  const handleRejectSubmitted = (id) => {
    toast
      .promise(axios.post(API_ENDPOINT + "/combination/submited-reject/" + id), {
        loading: "Đang huỷ phê duyệt...",
        success: <b>Huỷ phê duyệt thành công!</b>,
        error: <b>Huỷ phê duyệt thất bại.</b>
      })
      .then(() => setStudents((prev) => prev.filter((item) => item.userId !== id)))
      .finally(() => setShowModal(false));
  };

  return (
    <Modal show centered onHide={setShowModal}>
      <Modal.Header>
        <Modal.Title className="fs-1">Huỷ phê duyệt</Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4 fs-2">
        Bạn có muốn huỷ duyệt học sinh?
        <div className="flex flex-col mt-10">
          <div className="flex flex-col items-center">
            <img
              src={data.avatar}
              className="border"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "50%"
              }}
              alt=""
            />
            <span className="fs-1 text-gray-900 mt-2" title="Họ và Tên">
              {data.fullName}
            </span>
            <p className="italic text-gray-400" title="Giới tính">
              {data.gender}
            </p>
          </div>
          <div className="flex w-100 mt-4">
            <div className="flex flex-col items-center w-1/2 mx-3">
              <span className="mb-2 fs-2">Nguyện vọng 1</span>
              <div className="shadow w-100 flex justify-center items-center text-green-500 h-40 rounded-xl bg-slate-100">
                {data.combination1}
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2 mx-3">
              <span className="mb-2 fs-2">Nguyện vọng 2</span>
              <div className="shadow w-100 flex justify-center items-center text-green-500 h-40 rounded-xl bg-slate-100">
                {data.combination2}
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4">
            <div className="flex gap-4 mt-4">
              <span>- Điểm thi tuyển: </span>
              <span className="fs-2 text-green-700  flex items-center fw-bolder">
                {Number(data.mathPoint) + Number(data.literaturePoint) + Number(data.englishPoint)}
              </span>
            </div>
            <div className="flex flex-col">
              <span>- Diện mồ côi, hộ nghèo, hộ cận nghèo: </span>
              <span className="ms-4 fw-bold">{data.priorityGroup || "Không có"}</span>
            </div>
            <div className="flex gap-4">
              <span>- Thành tích thi HSG môn: </span>
              <span className="fw-bold">{data.goodSubject || "Không có"}</span>
            </div>
            <div className="ms-4 flex gap-4">
              <span>+ cấp Huyện/TP: </span>
              <span className="fw-bold">{data.goodSubjectDistrict || "Không có"}</span>
            </div>
            <div className="ms-4 flex gap-4">
              <span>+ cấp Tỉnh: </span>
              <span className="fw-bold">{data.goodSubjectProvince || "Không có"}</span>
            </div>
            <span>- Đạt giải TDTT, VN, UPU, KHKT,… : </span>
            <div className="ms-4 flex gap-4">
              <span>+ đạt giải: </span>
              <span className="fw-bold">{data.avchielementLevel || "Không có"}</span>
            </div>
            <div className="ms-4 flex gap-4">
              <span>+ lĩnh vực: </span>
              <span className="fw-bold">{data.avchielementGroup || "Không có"}</span>
            </div>
            <span>- Mắc bệnh: </span>
            <ol className="list-decimal ps-4 ms-10">
              {data.sick.length > 0 ? (
                data?.sick?.map((item, index) => (
                  <li className="fw-bold" key={index}>
                    {item}
                  </li>
                ))
              ) : (
                <span className="fw-bold">Không có</span>
              )}
            </ol>
            <span>- Học sinh thuộc diện: </span>
            <ol className="list-decimal ps-4 ms-10">
              {data.typeStudent.length > 0 ? (
                data?.typeStudent?.map((item, index) => (
                  <li className="fw-bold" key={index}>
                    {item}
                  </li>
                ))
              ) : (
                <span className="fw-bold">Không có</span>
              )}
            </ol>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="fs-3" onClick={() => handleRejectSubmitted(data.userId)}>
          Huỷ duyệt
        </Button>
        <Button variant="secondary" onClick={() => setShowModal(false)} className="fs-3">
          Huỷ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRejectStudent;
