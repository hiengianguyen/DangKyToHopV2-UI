import classNames from "classnames/bind";
import style from "./CombinationStep4R.module.scss";
import InputHadValue from "../../../../Component/InputHadValue";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/esm/Badge";
import { typeBadge } from "../../../../../../utils";

const cx = classNames.bind(style);

function CombinationStep4R({ valueStudent = {}, role = "student" }) {
  return (
    <div className={cx("card-body", "container")} style={{ fontSize: "17px" }}>
      {role === "manager" && (
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
          {valueStudent.typeStudent && valueStudent.typeStudent.length !== 0 && (
            <div className="mt-10">
              <span className={cx("student-type")}>- Là học sinh thuộc diện sau:</span>
              <ol className="list-decimal ps-10 ms-10 fs-2">
                {valueStudent.typeStudent &&
                  valueStudent.typeStudent.map((item, index) => (
                    <li className="fs-2" key={index}>
                      {item}
                    </li>
                  ))}
              </ol>
            </div>
          )}
          {valueStudent.avchielementGroup && valueStudent.avchielementGroup.length !== 0 && (
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="+ Vận động viên TT TDTT Tỉnh/TP, môn" value={valueStudent.avchielementGroup} />
              </Col>
            </Row>
          )}
          {valueStudent.aptitude && valueStudent.aptitude.length !== 0 && (
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="- Năng khiếu vượt trội" value={valueStudent.aptitude} />
              </Col>
            </Row>
          )}
          {valueStudent.priorityGroup && valueStudent.priorityGroup.length !== 0 && (
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="- Diện mồ côi, hộ nghèo, hộ cận nghèo" value={valueStudent.priorityGroup} />
              </Col>
            </Row>
          )}
          {valueStudent.difficultSituation && valueStudent.difficultSituation.length !== 0 && (
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="- Hoàn cảnh khó khăn" value={valueStudent.difficultSituation} />
              </Col>
            </Row>
          )}
          {valueStudent.disability && valueStudent.disability.length !== 0 && (
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="+ Diện khuyết tật" value={valueStudent.disability} />
              </Col>
            </Row>
          )}
          <div className="flex">
            <div className="flex flex-col w-1/2">
              <Col>
                <span className={cx("health-status", "mt-2", "student-type")}>Tình trạng sức khỏe:</span>
              </Col>
              {valueStudent.sick && valueStudent.sick.length !== 0 && (
                <>
                  <span className="fs-1">Mắc bệnh:</span>
                  <ul className="list-disc ps-10 ms-10 fs-2">
                    {valueStudent.sick &&
                      valueStudent.sick.map((item, index) => (
                        <li className="fs-2" key={index}>
                          {item}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
            <Row>
              <Col>
                <InputHadValue label="+ Chiều cao (cm)" value={valueStudent.height} />
              </Col>
              <Col>
                <InputHadValue label="+ Cân nặng (kg)" value={valueStudent.weight} />
              </Col>
            </Row>
          </div>
          {valueStudent.disability && valueStudent.disability.length !== 0 && (
            <Row>
              <Col xs={"auto"}>
                <InputHadValue label="+ Diện khuyết tật" value={valueStudent.disability} />
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default CombinationStep4R;
