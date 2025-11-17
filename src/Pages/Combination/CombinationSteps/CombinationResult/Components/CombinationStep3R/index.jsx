import classNames from "classnames/bind";
import style from "./CombinationStep3R.module.scss";
import InputHadValue from "../../../../Component/InputHadValue";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CombinationTable from "../../../../Component/CombinationTable";
import { typeBadge } from "../../../../../../utils";
import Badge from "react-bootstrap/esm/Badge";
import TablePoints from "../../../../Component/TablePoints";

const cx = classNames.bind(style);

function CombinationStep3R({ valueStudent = {}, role = "student" }) {
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
        <div className={cx("header", "second")}>
          <div className={cx("first-slogan")}>
            <span>SỞ GDĐT THÀNH PHỐ ĐÀ NẴNG</span>
            <span className={cx("second-line")}>TRƯỜNG THPT DUY TÂN</span>
          </div>
          <div className={cx("second-slogan")}>
            <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
            <span className={cx("second-line")}>Độc lập - Tự do - Hạnh phúc</span>
          </div>
        </div>
        <div className={cx("title-doc")}>
          <span>ĐƠN ĐĂNG KÝ</span>
          <span>Chọn tổ hợp môn học lớp 10, năm học 2025 - 2026</span>
        </div>
        <div className="container">
          <Row>
            <Col xs={8}>
              <InputHadValue label="Họ và tên học sinh" value={valueStudent.fullName} />
            </Col>
            <Col xs={4}>
              <InputHadValue label="STT ở DS trúng tuyển" value={valueStudent.numberMatriculation} />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <InputHadValue label="Họ và tên phụ huynh" value={valueStudent.nameDad || valueStudent.nameMom} />
            </Col>
            <Col>
              <InputHadValue label="ĐTDD" value={valueStudent.phoneDad} />
            </Col>
          </Row>
          <div className={cx("info-box", "mt-4")}>
            <span className={cx("title", "text-uppercase")}>I. Điểm thi tuyển vào lớp 10 và kết quả học tập, rèn luyện</span>
            <div className={cx("table-point", "mt-4")}>
              <TablePoints valueStudent={valueStudent} readOnly={true} />
            </div>
            <span className={cx("title", "text-uppercase")}>II. TỔ HỢP LỰA CHỌN CỤ THỂ</span>
            <CombinationTable />
            <Row>
              <Col>
                <InputHadValue label="- Nguyện vọng 1" value={valueStudent.combination1} />
              </Col>
              <Col>
                <InputHadValue label="- Nguyện vọng 2" value={valueStudent.combination2} />
              </Col>
            </Row>
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="- Môn thể thao" value={valueStudent.sport} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinationStep3R;
