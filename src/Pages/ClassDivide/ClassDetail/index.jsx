import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ClassDetail.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FillterBoxDetail from "./FillterBoxDetail";
import CardStudent from "./CardStudent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NonDataImg from "../Students/Component/NonDataImg";
import Loading from "../../../Components/Loading";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);

function ClassDetail() {
  const formRef = useRef();
  const [formElement, setFormElement] = useState();
  const [classDetail, setClassDetail] = useState([]);
  const [studentListMain, setStudentListMain] = useState([]);
  const [students, setStudents] = useState([]);
  const [sortList, setSortList] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [messageNonData, setMessageNonData] = useState(
    "Hiện chưa có học sinh được xếp vào lớp này"
  );

  const { id } = useParams();

  useEffect(() => {
    setFormElement(formRef.current);
  }, []);

  useEffect(() => {
    axios
      .get(API_ENDPOINT + "/ad/class/" + id)
      .then((res) => {
        setStudents(res.data.students);
        setClassDetail(res.data.classDetail);
        setStudentListMain(res.data.students);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSubmit = (sort) => {
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0 && students.length === 0) return;
    if (sort && Object.keys(sort).length) {
      data.sort = sort;
      setSortList(sort);
    }

    data.studentList = studentListMain;
    axios.post(API_ENDPOINT + "/ad/student/sort", data).then((axiosData) => {
      if (axiosData.data.isSuccess) {
        setStudents(axiosData.data.studentListAfterSort);
        setMessageNonData("Không có học sinh nào trong lớp theo bộ lọc");
      }
    });
  };

  const handleExportExcel = (data) => {
    axios
      .post(
        API_ENDPOINT + "/file/excel/class-detail",
        { submittedList: data },
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "DanhSachDangKy.xlsx";
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className={cx("wrapper")}>
      {isloading && <Loading title="Đang tải danh sách" />}
      <Link to={-1} className={cx("btn-redirect")}>
        <FontAwesomeIcon icon={faArrowLeft} className="" />
      </Link>
      <div className="container w-50">
        <div className={cx("title")}>
          <div className="flex flex-col">
            <h1 className="fs-1 fw-bolder">Lớp {classDetail.name}</h1>
            <h2 className="fs-1">
              Giáo viên chủ nhiệm:{" "}
              <i className="fw-bolder">{classDetail.teacher}</i>
            </h2>
          </div>
          <DropdownButton drop="start" size="lg" title="Xuất file Excel">
            <Dropdown.Item
              className="fs-4 p-3"
              onClick={() => handleExportExcel(studentListMain)}
            >
              Tất cả học sinh
            </Dropdown.Item>
            <Dropdown.Item
              className="fs-4 p-3"
              onClick={() => handleExportExcel(students)}
            >
              Học sinh đã lọc
            </Dropdown.Item>
          </DropdownButton>
        </div>

        <form ref={formRef}>
          <FillterBoxDetail
            handleSubmit={() => handleSubmit(sortList)}
            handleSubmitHaveSort={handleSubmit}
          />
        </form>

        <div className={cx("list-student", "mb-10")}>
          {students && students?.length > 0 ? (
            students.map((item, index) => (
              <div className="d-flex align-items-center" key={index}>
                <span className={cx("count")}>{index + 1}</span>
                <CardStudent
                  data={item}
                  setStudents={setStudents}
                  classDetail={classDetail}
                />
              </div>
            ))
          ) : (
            <NonDataImg title="Không có học sinh" message={messageNonData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassDetail;
