import classNames from "classnames/bind";
import style from "./CombinationStep2R.module.scss";
import InputHadValue from "../../../../Component/InputHadValue";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/esm/Badge";
import { typeBadge } from "../../../../../../utils";
import formatDayRegistered from "../../../../../../utils/formatDayRegistered";

const cx = classNames.bind(style);

function CombinationStep2R({ valueStudent = {}, role = "student" }) {
  const date = formatDayRegistered(valueStudent.registeredAt);
  return (
    <div className={cx("card-body", "container")} style={{ fontSize: "17px" }}>
      {valueStudent.status && (
        <h3>
          Trạng thái:{" "}
          <Badge className="p-3 shadow" bg={typeBadge(valueStudent.status).color}>
            {typeBadge(valueStudent.status).title}
          </Badge>
        </h3>
      )}
      <div className={cx("content")}>
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
            {valueStudent.avatar && <img src={valueStudent.avatar} className={cx("img-result")} alt="avatar" />}
          </div>
          <div className={cx("title-doc")}>
            <span>Kính gửi: Hiệu trưởng Trường THPT Duy Tân</span>
          </div>
        </div>
        <Row>
          <Col xs={8}>
            <InputHadValue label="Em tên là" value={valueStudent.fullName} />
          </Col>
          <Col>
            <InputHadValue label="Nam (Nữ)" value={valueStudent.gender} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputHadValue label="Sinh ngày" value={valueStudent.dayOfBirth} />
          </Col>
          <Col>
            <InputHadValue label="Dân tộc" value={valueStudent.nation} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputHadValue label="Địa chỉ thường chú" value={`KP ${valueStudent.village}, ${valueStudent.commune}, ${valueStudent.city}`} />
          </Col>
          <Col>
            <InputHadValue label="Số điện thoại" value={valueStudent.phone} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputHadValue label="Học sinh lớp 9 Trường THCS" value={valueStudent.secondarySchool} />
          </Col>
          <Col>
            <InputHadValue label="Xã/Phường" value={valueStudent.secondarySchoolDistrict} />
          </Col>
        </Row>
        {valueStudent.aptitude && valueStudent.aptitude.length !== 0 && (
          <Col>
            <InputHadValue label="Năng khiếu vượt trội (môn/lĩnh vực – nếu có)" value={valueStudent.aptitude} />
          </Col>
        )}
        {valueStudent.aspirationSubject && valueStudent.aspirationSubject.length !== 0 && (
          <Col>
            <InputHadValue label="Nguyện vọng được vào đội tuyển học sinh giỏi môn (nếu có)" value={valueStudent.aspirationSubject} />
          </Col>
        )}
        {valueStudent.goodSubject && valueStudent.goodSubject.length !== 0 && (
          <Row>
            <Col xs={"auto"}>
              <InputHadValue label="Thành tích thi HSG năm lớp 9 (nếu có) môn" value={valueStudent.goodSubject} />
            </Col>
          </Row>
        )}
        {(valueStudent.goodSubjectDistrict && valueStudent.goodSubjectDistrict.length !== 0) ||
        (valueStudent.goodSubjectProvince && valueStudent.goodSubjectProvince.length !== 0) ? (
          <Row>
            {valueStudent.goodSubjectDistrict && valueStudent.goodSubjectDistrict.length !== 0 && (
              <Col>
                <InputHadValue label="đạt giải cấp huyện/TP: giải" value={valueStudent.goodSubjectDistrict} />
              </Col>
            )}
            {valueStudent.goodSubjectProvince && valueStudent.goodSubjectProvince.length !== 0 && (
              <Col>
                <InputHadValue label="đạt giải cấp tỉnh: giải" value={valueStudent.goodSubjectProvince} />
              </Col>
            )}
          </Row>
        ) : null}
        {(valueStudent.avchielementLevel && valueStudent.avchielementLevel.length !== 0) ||
        (valueStudent.avchielementGroup && valueStudent.avchielementGroup.length !== 0) ? (
          <>
            <Col className="d-flex align-items-end mt-4">
              <span className={cx("avchielement-label")}>
                Đạt giải TDTT, VN, UPU, KHKT,… do Sở GDĐT tổ chức (hoặc phối hợp tổ chức)(nếu có):{" "}
              </span>
            </Col>
            <Row>
              {valueStudent.avchielementLevel && valueStudent.avchielementLevel.length !== 0 && (
                <Col xs={"auto"}>
                  <InputHadValue label="giải" value={valueStudent.avchielementLevel} />
                </Col>
              )}
              {valueStudent.avchielementGroup && valueStudent.avchielementGroup.length !== 0 && (
                <Col>
                  <InputHadValue label="lĩnh vực" value={valueStudent.avchielementGroup} />
                </Col>
              )}
            </Row>
          </>
        ) : null}
        <p className={cx("quote")}>
          Em làm đơn này xin được nhập học lớp 10 Trường THPT Duy Tân năm học 2025 -2026 và cam kết thực hiện nghiêm túc nhiệm vụ của học
          sinh, chấp hành tốt nội quy nhà trường.
        </p>
        <div className={cx("flex justify-end items-center fst-italic mt-4", "resgiter-place-box")}>
          <p className={cx("input-resgiter-place")}>{valueStudent.registerPlace}</p>
          <p>, ngày</p> <p className="mx-2">{date[0]}</p>
          <p>tháng</p> <p className="mx-2">{date[1]}</p>
          <p>năm</p> <p className="mx-2">{date[2]}</p>
        </div>

        <div className="flex items-center mt-20 fs-2">
          <div className="flex flex-col items-center">
            <b>Xác nhận của cha/mẹ HS hoặc người giám hộ</b>
            <i>(Ký và ghi rõ họ tên)</i>
            <img src={valueStudent.signatureParents} style={{ width: "260px", height: "130px", marginTop: "10px" }} alt="" />
          </div>
          <div className="flex flex-col items-center flex-1">
            <b>Học sinh</b>
            <i>(Ký và ghi rõ họ tên)</i>
            <img src={valueStudent.signatureStudent} style={{ width: "260px", height: "130px", marginTop: "10px" }} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinationStep2R;
