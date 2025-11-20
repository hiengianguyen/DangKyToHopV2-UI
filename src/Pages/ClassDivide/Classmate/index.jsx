import classNames from "classnames/bind";
import style from "./Classmate.module.scss";
import Container from "react-bootstrap/esm/Container";
import CardClass from "./CardClass";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import AddClassCard from "./AddClassCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalAddClass from "./CardClass/ModalAddClass";
import ModalDeleteClass from "./CardClass/ModalDeleteClass";
import Loading from "../../../Components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);

function Classmate() {
  const [dataClassesPage, setDataClassesPage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState({ bol: false });
  const [updateModal, setUpdateModal] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get(API_ENDPOINT + "/ad/classes")
      .then((res) => {
        const data = res.data;
        if (data.redirect) {
          navigator(data.redirect);
          return;
        }
        setDataClassesPage(data);
      })
      .finally(() => setIsLoading(false));
  }, [navigator]);

  return (
    <div className={cx("wrapper")}>
      {isloading && <Loading title="Đang tải dữ liệu các lớp" />}
      <div className={cx("title-box")}>
        <h2 className="fs-2 text-center text-gray-800 fw-bolder mb-4">
          🏫 Quản lý các lớp học
        </h2>
        <p className="fs-3 text-center text-gray-600 fw-medium">
          Trang này cho phép theo dõi và quản lý thông tin các lớp:
        </p>
        <p className="fs-3 text-center text-gray-600 fw-medium">
          số lượng học sinh, danh sách thành viên, và các thao tác phân chia –
          điều chỉnh lớp học.
        </p>
      </div>

      <Container className={cx("pb-4", "list-class")}>
        <Row className="gap-4 justify-content-center">
          <Col xs={"auto"}>
            <AddClassCard onClick={() => setShowModal(true)} />
          </Col>
          {dataClassesPage?.classes?.map((item, index) => (
            <Col xs={"auto"} key={index}>
              <CardClass
                data={item}
                setUpdateModal={setUpdateModal}
                setShowDeleteModal={setShowDeleteModal}
                studentCount={dataClassesPage.countStudentInClass[item.id] || 0}
              />
            </Col>
          ))}
        </Row>
        <div className="flex justify-start mt-10 text-blue-600">
          <Link to="/ad/students" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="" />
            Chế độ phân chia lớp
          </Link>
        </div>
      </Container>
      <ModalAddClass
        show={showModal || updateModal?.bol}
        setShow={setShowModal}
        setUpdateModal={setUpdateModal}
        data={
          updateModal?.id
            ? dataClassesPage.classes.find((item) => item.id === updateModal.id)
            : undefined
        }
        isUpdate={updateModal?.bol}
        setDataClassesPage={setDataClassesPage}
      />
      <ModalDeleteClass
        show={showDeleteModal.bol}
        setShowDeleteModal={setShowDeleteModal}
        setClasses={setDataClassesPage}
        classInfo={showDeleteModal.info}
      />
    </div>
  );
}

export default Classmate;
