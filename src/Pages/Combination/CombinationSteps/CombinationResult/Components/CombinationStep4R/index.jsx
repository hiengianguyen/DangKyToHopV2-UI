import classNames from "classnames/bind";
import style from "./CombinationStep4R.module.scss";
import InputHadValue from "../../../../Component/InputHadValue";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/esm/Badge";
import { typeBadge } from "../../../../../../utils";
import Form from "react-bootstrap/Form";

const cx = classNames.bind(style);

function CombinationStep4R({ valueStudent = {} }) {
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
        </div>
        <div className={cx("title-doc")}>
          <span>LÝ LỊCH HỌC SINH</span>
        </div>
        <div className="container">
          <Row>
            <Col xs={7}>
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
            <Col xs={"auto"}>
              <InputHadValue label="Ngày sinh" value={valueStudent.dayOfBirth} />
            </Col>
            <Col>
              <InputHadValue label="Nơi sinh" value={valueStudent.placeOfBirth} />
            </Col>
          </Row>
          <p className={cx("place-label", "mt-10")}>Hộ khẩu thường trú:</p>
          <Row>
            <Col>
              <InputHadValue label="KP" value={valueStudent.village} />
            </Col>
            <Col>
              <InputHadValue label="Xã/Phường" value={valueStudent.commune} />
            </Col>
          </Row>
          <Col>
            <InputHadValue label="Tỉnh" value={valueStudent.city} />
          </Col>
          <p className={cx("place-label", "mt-10 fw-bolder")}>Thông tin cha mẹ:</p>
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
          <span className={cx("student-type")}>- Là học sinh thuộc diện sau</span>

          <Row className="fs-1">
            <Col>
              <Form.Check label="Con liệt sĩ" checked={valueStudent?.typeStudent?.includes("Con liệt sĩ")} type="checkbox" />
            </Col>
            <Col>
              <Form.Check
                onChange={() => {}}
                label="Con thương binh, bệnh binh từ 81% trở lên"
                checked={valueStudent?.typeStudent?.includes("Con thương binh, bệnh binh từ 81% trở lên")}
                type="checkbox"
              />
            </Col>
          </Row>
          <Row className="fs-1">
            <Col>
              <Form.Check
                onChange={() => {}}
                label="Con dân tộc thiểu số"
                checked={valueStudent?.typeStudent?.includes("Con dân tộc thiểu số")}
                type="checkbox"
              />
            </Col>
            <Col>
              <Form.Check
                onChange={() => {}}
                label="Con thương binh, bệnh binh dưới 81%"
                checked={valueStudent?.typeStudent?.includes("Con thương binh, bệnh binh dưới 81%")}
                type="checkbox"
              />
            </Col>
          </Row>
          <Row className="fs-1">
            <Col>
              <Form.Check
                onChange={() => {}}
                label="Con Anh hùng LLVT"
                checked={valueStudent?.typeStudent?.includes("Con Anh hùng LLVT")}
                type="checkbox"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={"auto"}>
              <InputHadValue label="+ Vận động viên TT TDTT tỉnh/TP, môn" value={valueStudent.avchielementGroup} />
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <InputHadValue label="- Năng khiếu vượt trội (môn/lĩnh vực)" value={valueStudent.aptitude} />
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <InputHadValue
                label="- Diện mồ côi, hộ nghèo, hộ cận nghèo"
                nonRequired={true}
                name="priorityGroup"
                value={valueStudent.priorityGroup}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <InputHadValue
                label="- Hoàn cảnh khó khăn"
                nonRequired={true}
                name="difficultSituation"
                value={valueStudent.difficultSituation}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <span className={cx("health-status", "mt-2")}>- Tình trạng sức khỏe:</span>
            </Col>
            <Col>
              <InputHadValue label="+ Chiều cao (cm)" type="number" name="height" value={valueStudent.height} />
            </Col>
            <Col>
              <InputHadValue label="+ Cân nặng (kg)" type="number" name="weight" value={valueStudent.weight} />
            </Col>
          </Row>

          <Row className="mt-4 fs-1">
            <Col xs={"auto"}>+ </Col>
            <Col>
              <Form.Check
                onChange={() => {}}
                label="Bệnh ngoài da"
                checked={valueStudent?.sick?.includes("Bệnh ngoài da")}
                type="checkbox"
              />
            </Col>
            <Col>
              <Form.Check
                onChange={() => {}}
                label="Bệnh tim mạch"
                checked={valueStudent?.sick?.includes("Bệnh tim mạch")}
                type="checkbox"
              />
            </Col>
            <Col>
              <Form.Check onChange={() => {}} label="Bệnh hô hấp" checked={valueStudent?.sick?.includes("Bệnh hô hấp")} type="checkbox" />
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <InputHadValue label="+ Diện khuyết tật" value={valueStudent.disability} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CombinationStep4R;
