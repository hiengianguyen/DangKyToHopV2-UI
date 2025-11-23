import classNames from "classnames/bind";
import style from "./CombinationStep2.module.scss";
import InputHadValue from "../../Component/InputHadValue";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import InputBorder from "../../Component/InputBorder";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useRef, useState } from "react";
import CropAvatarStudent from "../../Component/CropAvatarStudent";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import UploadSignature from "../../../../Components/UploadSignature";

const cx = classNames.bind(style);

function CombinationStep2({ setCurrPage = () => {}, setValueStudent = () => {}, valueStudent = {} }) {
  const formRef = useRef();
  const fileInputRef = useRef();
  const [formElememt, setFormElememt] = useState();
  const [fileInput, setFileInput] = useState();
  const [urlAvarTar, setUrlAvarTar] = useState("");
  const [urlAvarTarResult, setUrlAvarTarResult] = useState(null);
  const [signatureParent, setSignatureParent] = useState("");
  const [signatureStudent, setSignatureStudent] = useState("");
  const [showResultImg, setShowResultImg] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [validated, setValidated] = useState(false);

  const currentTime = new Date();

  useEffect(() => {
    setFormElememt(formRef.current);
    setFileInput(fileInputRef.current);
  }, []);

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Đơn xin nhập học";
  }, []);

  useEffect(() => {
    if (valueStudent === undefined) return;
    if (valueStudent.avatar) {
      setUrlAvarTarResult(valueStudent.avatar);
      setShowResultImg(true);
    }
  }, [valueStudent]);

  const handleSubmit = () => {
    if (urlAvarTarResult === null || urlAvarTarResult.length === 0 || signatureParent === "" || signatureStudent === "") {
      return toast.error("Vui lòng chọn ảnh thẻ hoặc chữ ký");
    }
    if (formElememt.checkValidity()) {
      const formData = new FormData(formElememt);
      const data = Object.fromEntries(formData.entries());
      setValueStudent((prev) => ({ ...prev, ...data }));
      setCurrPage(3);
    }
    setValidated(true);
  };

  const handleGetUrlImg = (file) => {
    if (!file) return;
    const urlImg = URL.createObjectURL(file);
    setShowResultImg(true);
    setShowCropper(true);
    setUrlAvarTar(urlImg);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-step")}>
        <h4>Đơn xin nhập học</h4>
      </div>

      <div className="mt-4 flex justify-between">
        <Button primary="true" onClick={() => setCurrPage(1)} className={cx("button", "fs-3", "px-4", "me-3")}>
          Trở lại
        </Button>
        <Button primary="true" onClick={handleSubmit} className={cx("button", "fs-3", "px-4")}>
          Tiếp tục
        </Button>
      </div>

      <div className={cx("card-body", "container")} style={{ fontSize: "17px" }}>
        <div className={cx("content")}>
          <Form noValidate validated={validated} ref={formRef} onSubmit={handleSubmit}>
            <div className={cx("header")}>
              <div className={cx("first-slogan")}>
                <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                <span className={cx("second-line")}>Độc lập - Tự do - Hạnh phúc</span>
              </div>
              <div className={cx("second-slogan")}>
                <span>ĐƠN XIN NHẬP HỌC LỚP 10</span>
                <span className={cx("second-line")}>Năm học 2025 - 2026</span>
              </div>
              <div className={cx("choose-avatar-box")}>
                <span className={cx("title-avatar")}>Ảnh thẻ:</span>
                <div style={{ width: "max-content" }} className="d-flex align-items-center">
                  {!showResultImg && (
                    <div className={cx("imgBoderFake")}>
                      <p>3x4</p>
                    </div>
                  )}
                  {showResultImg && <img src={urlAvarTarResult || valueStudent.avatar || null} className={cx("img-result")} alt="" />}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className={cx("choose-avatar")}
                    onChange={(e) => handleGetUrlImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  {showCropper && (
                    <CropAvatarStudent
                      size={3 / 4}
                      setShowCropper={setShowCropper}
                      imgUrl={valueStudent.avatarImgPrev || urlAvarTar}
                      onChangeImg={setUrlAvarTarResult}
                    />
                  )}
                </div>
                <input name="avatar" defaultValue={urlAvarTarResult} style={{ display: "none" }} />
                <input name="avatarImgPrev" defaultValue={urlAvarTar} style={{ display: "none" }} />
                <button type="button" className={cx("btn-choose-file", "btn btn-primary fs-2 mt-3")} onClick={() => fileInput.click()}>
                  Chọn ảnh
                </button>
                {showResultImg && (
                  <button type="button" className={cx("btn btn-primary fs-2 mt-3")} onClick={() => setShowCropper(true)}>
                    Cắt lại
                  </button>
                )}
              </div>
              <div className={cx("title-doc")}>
                <span>Kính gữi: Hiệu trưởng Trường THPT Duy Tân</span>
              </div>
            </div>
            <Row>
              <Col xs={6}>
                <InputHadValue label="Em tên là" value={valueStudent.fullName} />
              </Col>
              <Col>
                <Col>
                  <InputHadValue label="Nam (Nữ)" value={valueStudent.gender} />
                </Col>
              </Col>
              <Col>
                <InputHadValue label="Dân tộc" value={valueStudent.nation} />
              </Col>
            </Row>

            <Row>
              <Col>
                <InputHadValue label="Sinh ngày" fontStyle="none" value={valueStudent.dayOfBirth} />
              </Col>

              <Col>
                <InputHadValue label="Số điện thoại" fontStyle="none" value="0362356747" />
              </Col>
            </Row>

            <Col>
              <InputHadValue
                label="Địa chỉ thường chú"
                value={`KP ${valueStudent.village}, Phường ${valueStudent.commune}, ${valueStudent.city}`}
              />
            </Col>
            <Row>
              <Col>
                <InputHadValue label="Học sinh lớp 9 Trường THCS" value="THCS Lý Thường Kiệt" />
              </Col>
              <Col>
                <InputHadValue label="Xã/Phường" value="Phường Quảng Phú" />
              </Col>
            </Row>
            <Col>
              <InputBorder
                label="Năng khiếu vượt trội (môn/lĩnh vực – nếu có)"
                nonRequired={true}
                name="aptitude"
                defaultValue={valueStudent.aptitude}
                fontStyle="capitalize"
              />
            </Col>
            <Col>
              <InputBorder
                label="Nguyện vọng được vào đội tuyển học sinh giỏi môn (nếu có)"
                nonRequired={true}
                name="aspirationSubject"
                defaultValue={valueStudent.aspirationSubject}
                fontStyle="capitalize"
              />
            </Col>
            <Col>
              <InputBorder
                label="Thành tích thi HSG năm lớp 9 (nếu có) môn"
                nonRequired={true}
                name="goodSubject"
                defaultValue={valueStudent.goodSubject}
                fontStyle="capitalize"
              />
            </Col>
            <Row>
              <Col>
                <InputBorder
                  label="đạt giải cấp huyện/TP: giải"
                  nonRequired={true}
                  name="goodSubjectDistrict"
                  defaultValue={valueStudent.goodSubjectDistrict}
                  fontStyle="capitalize"
                />
              </Col>
              <Col>
                <InputBorder
                  label="đạt giải cấp tỉnh: giải"
                  nonRequired={true}
                  name="goodSubjectProvince"
                  defaultValue={valueStudent.goodSubjectProvince}
                  fontStyle="capitalize"
                />
              </Col>
            </Row>
            <Col className="d-flex align-items-end my-4">
              <span className={cx("avchielement-label")}>
                Đạt giải TDTT, VN, UPU, KHKT,… do Sở GDĐT tổ chức (hoặc phối hợp tổ chức)(nếu có):{" "}
              </span>
            </Col>
            <Row>
              <Col>
                <InputBorder
                  label="giải"
                  name="avchielementLevel"
                  defaultValue={valueStudent.avchielementLevel}
                  fontStyle="capitalize"
                  nonRequired={true}
                />
              </Col>
              <Col>
                <InputBorder
                  label="lĩnh vực"
                  name="avchielementGroup"
                  defaultValue={valueStudent.avchielementGroup}
                  fontStyle="capitalize"
                  nonRequired={true}
                />
              </Col>
            </Row>
            <p className={cx("quote")}>
              Em làm đơn này xin được nhập học lớp 10 Trường THPT Duy Tân năm học 2025 -2026 và cam kết thực hiện nghiêm túc nhiệm vụ của
              học sinh, chấp hành tốt nội quy nhà trường.
            </p>
            <div className={cx("flex justify-end items-center fst-italic mt-4", "resgiter-place-box")}>
              <Form.Control
                className={cx("input-resgiter-place")}
                defaultValue={valueStudent.registerPlace}
                required
                type="text"
                name="registerPlace"
              />
              <p>, ngày</p> <p className="mx-2">{currentTime.getDate()}</p>
              <p>tháng</p> <p className="mx-2">{currentTime.getMonth() + 1}</p>
              <p>năm</p> <p className="mx-2">{currentTime.getFullYear()}</p>
            </div>

            <div className="flex items-center mt-20 fs-2">
              <div className="flex flex-col items-center">
                <b>Xác nhận của cha/mẹ HS hoặc người giám hộ</b>
                <i>(Ký và ghi rõ họ tên)</i>
                <UploadSignature
                  title="Chữ ký của cha/mẹ"
                  dataAvatarImg={valueStudent.signatureParents}
                  onValue={setSignatureParent}
                  name="signatureParents"
                />
              </div>
              <div className="flex flex-col items-center flex-1">
                <b>Học sinh</b>
                <i>(Ký và ghi rõ họ tên)</i>
                <UploadSignature
                  title="Chữ ký của học sinh"
                  dataAvatarImg={valueStudent.signatureStudent}
                  onValue={setSignatureStudent}
                  name="signatureStudent"
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CombinationStep2;
