import classNames from "classnames/bind";
import style from "./CombinationStep1.module.scss";
import InputBorder from "../../Component/InputBorder";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Select from "../../Component/Select";
import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";

const cx = classNames.bind(style);

function CombinationStep1({ nations = [], secondarySchools = [], setCurrPage = () => {}, setValueStudent = () => {}, valueStudent = {} }) {
  const formRef = useRef();
  const [formElememt, setFormElememt] = useState();
  const [selectSchool, setSelectSchool] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setFormElememt(formRef.current);
  }, []);

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Thông tin chính";
  }, []);

  useEffect(() => {
    if (!secondarySchools || Object.keys(valueStudent).length === 0) return;

    setSelectSchool(
      secondarySchools.find((item) => {
        return item.districtName === valueStudent.secondarySchoolDistrict;
      }).schools
    );
  }, [secondarySchools, valueStudent]);

  const changeSchoolSelect = (valueDistrict) => {
    setSelectSchool(
      secondarySchools.find((item) => {
        return item.districtName === valueDistrict;
      }).schools
    );
  };

  const handleSubmit = () => {
    if (formElememt.checkValidity()) {
      const formData = new FormData(formElememt);
      const data = Object.fromEntries(formData.entries());
      setValueStudent((prev) => ({ ...prev, ...data }));
      setCurrPage(2);
    }
    setValidated(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-step")}>
        <h4>Thông tin chính</h4>
      </div>

      <div className="d-flex justify-content-end">
        <Button primary="true" onClick={handleSubmit} className={cx("button", "fs-3", "px-4")}>
          Tiếp tục
        </Button>
      </div>

      <div className={cx("card-body", "container")} style={{ fontSize: "17px" }}>
        <div className={cx("content")}>
          <div className={cx("header")}>
            <span className={cx("first-line")}>SỞ GDĐT THÀNH PHỐ ĐÀ NẴNG</span>
            <span className={cx("second-line")}>TRƯỜNG THPT DUY TÂN</span>
          </div>

          <Form noValidate validated={validated} ref={formRef} onSubmit={handleSubmit}>
            <div className={cx("matriculation")}>
              <span>Số TT ở danh sách trúng tuyển: </span>
              <Form.Control
                type="number"
                step={1}
                min={1}
                max={500}
                defaultValue={valueStudent.numberMatriculation}
                name="numberMatriculation"
                required
              />
            </div>

            <div className={cx("title", "mb-4")}>
              <span className={cx("first-line")}>HỒ SƠ HỌC SINH</span>
              <span className={cx("second-line")}>Nhập học năm học 2025 – 2026 </span>
            </div>

            <Row>
              <Col xs={8}>
                <InputBorder label="Họ và tên" name="fullName" defaultValue={valueStudent.fullName} />
              </Col>
              <Col>
                <Select
                  label="Nam (Nữ)"
                  name="gender"
                  valueNoti="Chọn giới tính"
                  selected={valueStudent.gender}
                  opts={[
                    {
                      title: "Nam",
                      value: "Nam"
                    },
                    {
                      title: "Nữ",
                      value: "Nữ"
                    }
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputBorder label="Ngày sinh" name="dayOfBirth" type="date" fontStyle="none" defaultValue={valueStudent.dayOfBirth} />
              </Col>
              <Col>
                <Select
                  label="Dân tộc"
                  name="nation"
                  valueNoti="Chọn dân tộc"
                  selected={valueStudent.nation}
                  opts={nations.map((item) => ({
                    title: item.name,
                    value: item.name
                  }))}
                />
              </Col>
            </Row>

            <Col>
              <InputBorder label="Nơi sinh" name="placeOfBirth" defaultValue={valueStudent.placeOfBirth} />
            </Col>

            <Col xs={"auto"} className="d-flex align-items-end mt-8">
              <span className={cx("place-label")}>Hộ khẩu thường trú:</span>
            </Col>
            <Row>
              <Col>
                <InputBorder label="KP" name="village" defaultValue={valueStudent.village} />
              </Col>
              <Col>
                <InputBorder label="Xã/Phường" name="commune" defaultValue={valueStudent.commune} />
              </Col>
            </Row>
            <Col>
              <InputBorder label="Tỉnh" name="city" defaultValue={valueStudent.city} />
            </Col>

            <Col>
              <InputBorder label="Số CCCD/Mã Định Danh" name="identification" fontStyle="none" defaultValue={valueStudent.identification} />
            </Col>
            <Row>
              <Col>
                <InputBorder
                  label="Ngày cấp"
                  name="identificationDay"
                  type="date"
                  fontStyle="none"
                  defaultValue={valueStudent.identificationDay}
                />
              </Col>
              <Col>
                <InputBorder label="Nơi cấp" name="identificationPlace" defaultValue={valueStudent.identificationPlace} />
              </Col>
            </Row>

            <Col>
              <InputBorder label="Số điện thoại cá nhân" name="phone" type="number" defaultValue={valueStudent.phone} maxLength={10} />
            </Col>

            <Col>
              <InputBorder label="Họ và tên cha" name="nameDad" defaultValue={valueStudent.nameDad} />
            </Col>
            <Row>
              <Col>
                <InputBorder label="Nghề nghiệp" name="jobDad" fontStyle="none" defaultValue={valueStudent.jobDad} />
              </Col>
              <Col>
                <InputBorder label="SĐT" type="number" name="phoneDad" defaultValue={valueStudent.phoneDad} />
              </Col>
            </Row>

            <Col>
              <InputBorder label="Họ và tên mẹ" name="nameMom" defaultValue={valueStudent.nameMom} />
            </Col>
            <Row>
              <Col>
                <InputBorder label="Nghề nghiệp" fontStyle="none" name="jobMom" defaultValue={valueStudent.jobMom} />
              </Col>
              <Col>
                <InputBorder label="SĐT" type="number" name="phoneMom" defaultValue={valueStudent.phoneMom} />
              </Col>
            </Row>

            <Col>
              <Select
                label="Là học sinh Trường THCS"
                name="secondarySchool"
                valueNoti="Trường học"
                opts={selectSchool.map((item) => ({ title: item, value: item }))}
                selected={valueStudent.secondarySchool}
              />
            </Col>
            <Col>
              <Select
                onChange={(e) => {
                  changeSchoolSelect(e.target.value);
                }}
                label="Xã/Phường"
                name="secondarySchoolDistrict"
                opts={secondarySchools.map((item) => ({
                  title: item.districtName,
                  value: item.districtName
                }))}
                selected={valueStudent.secondarySchoolDistrict}
              />
            </Col>
          </Form>
          <div className={cx("doc-info")}>
            <span>Hồ sơ nhập học gồm</span>
            <ol className={cx("list-info", "list-decimal")}>
              <li>Đơn xin nhập học;</li>
              <li>Phiếu đăng ký tổ hợp môn học và chuyên đề lựa chọn;</li>
              <li>Tờ khai lý lịch học sinh;</li>
              <li>Bản photo Căn cước công dân (không cần công chứng);</li>
              <li>Bản photo Thẻ bảo hiểm y tế (không cần công chứng);</li>
              <li>
                Giấy tờ ưu tiên{" "}
                <i>
                  (nếu có - được photo công chứng, gồm: Giấy chứng nhận hộ nghèo, hộ cận nghèo; Giấy chứng nhận con liệt sĩ, con thương
                  binh; giấy chứng nhận khuyết tật, chứng nhận hưởng trợ cấp do mồ côi cha mẹ,....)
                </i>
                ;
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinationStep1;
