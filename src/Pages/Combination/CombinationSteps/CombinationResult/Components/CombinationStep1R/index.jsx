import Row from "react-bootstrap/esm/Row";
import InputHadValue from "../../../../Component/InputHadValue";
import Col from "react-bootstrap/esm/Col";
import classNames from "classnames/bind";
import style from "./CombinationStep1R.module.scss";
import Badge from "react-bootstrap/Badge";
import { typeBadge } from "../../../../../../utils";

const cx = classNames.bind(style);

function CombinationStep1R({ valueStudent = {}, role = "student" }) {
  return (
    <div className={cx("card-body", "container position-relative")} style={{ fontSize: "17px" }}>
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
          <span className={cx("first-line")}>SỞ GDĐT THÀNH PHỐ ĐÀ NẴNG</span>
          <span className={cx("second-line")}>TRƯỜNG THPT DUY TÂN</span>
        </div>
        <div className={cx("matriculation")}>
          <Col xs={"auto"}>
            <InputHadValue label="Số TT ở danh sách trúng tuyển" flexColumn={false} value={valueStudent.numberMatriculation} />
          </Col>
        </div>

        <div className={cx("title", "mb-20")}>
          <span className={cx("first-line")}>HỒ SƠ HỌC SINH</span>
          <span className={cx("second-line")}>Nhập học năm học 2025 – 2026 </span>
        </div>

        <Row>
          <Col xs={6}>
            <InputHadValue label="Họ và tên" value={valueStudent.fullName} />
          </Col>
          <Col>
            <InputHadValue label="Nam (Nữ)" value={valueStudent.gender} />
          </Col>
          <Col>
            <InputHadValue label="Dân tộc" value={valueStudent.nation} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputHadValue label="Ngày sinh" value={valueStudent.dayOfBirth} />
          </Col>
          <Col>
            <InputHadValue label="Nơi sinh" value={valueStudent.placeOfBirth} />
          </Col>
        </Row>
        <Col xs={"auto"} className="d-flex align-items-end mb-6">
          <span className={cx("place-label")}>Hộ khẩu thường trú:</span>
        </Col>
        <Row>
          <Col>
            <InputHadValue label="Khối phố" value={valueStudent.village} />
          </Col>
          <Col>
            <InputHadValue label="Xã/Phường" value={valueStudent.commune} />
          </Col>
        </Row>
        <Col>
          <InputHadValue label="Tỉnh" value={valueStudent.city} />
        </Col>

          <Col>
            <InputHadValue label="Số CCCD/Mã Định Danh" value={valueStudent.identification} />
          </Col>
        <Row>
          <Col>
            <InputHadValue label="Ngày cấp" value={valueStudent.identificationDay} />
          </Col>
          <Col>
            <InputHadValue label="Nơi cấp" value={valueStudent.identificationPlace} />
          </Col>
        </Row>

        <Col>
          <InputHadValue label="Số điện thoại cá nhân" value={valueStudent.phone} />
        </Col>

        <Col>
          <InputHadValue label="Họ và tên cha" value={valueStudent.nameDad} />
        </Col>
        <Row>
          <Col>
            <InputHadValue label="Nghề nghiệp" value={valueStudent.jobDad} />
          </Col>
          <Col>
            <InputHadValue label="SĐT" value={valueStudent.phoneDad} />
          </Col>
        </Row>

        <Col>
          <InputHadValue label="Họ và tên mẹ" value={valueStudent.nameMom} />
        </Col>
        <Row>
          <Col>
            <InputHadValue label="Nghề nghiệp" value={valueStudent.jobMom} />
          </Col>
          <Col>
            <InputHadValue label="SĐT" value={valueStudent.phoneMom} />
          </Col>
        </Row>

        <Row>
          <Col>
            <InputHadValue label="Trường học cấp 2" value={valueStudent.secondarySchool} />
          </Col>
          <Col>
            <InputHadValue label="Xã/Phường" value={valueStudent.secondarySchoolDistrict} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CombinationStep1R;
