import classNames from "classnames/bind";
import style from "./Students.module.scss";
import StudentItem from "./Component/StudentItem";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading";
import SortBox from "../../Combination/CombinationList/Components/SortBox";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import BarDivideClass from "./Component/BarDivideClass";
import DroppableList from "../../../Components/DroppableList";
import DragOverPlayStudent from "./Component/StudentItem/DragOverPlayStudent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import FillterBox from "./Component/FillterBox";
import { motion, AnimatePresence } from "framer-motion";
import Col from "react-bootstrap/esm/Col";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import NonDataImg from "./Component/NonDataImg";
import BtnSrcollTop from "../../../Components/BtnScrollTop";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);

function Students() {
  const formRef = useRef();
  const [data, setData] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const [formElement, setFormElement] = useState();
  const [submittedListMain, setSubmittedListMain] = useState([]);
  const [sortList, setSortList] = useState(null);
  const [showClassBar, setShowClassBar] = useState(false);
  const [scrollStudent, setScrollStudent] = useState({});
  const [fillter, setFillter] = useState({});
  const [page, setPage] = useState(1);

  const navigator = useNavigate();

  useEffect(() => {
    setFormElement(formRef.current);
  }, []);

  useEffect(() => {
    axios
      .get(API_ENDPOINT + "/ad/students")
      .then((res) => {
        const data = res.data;
        if (data.redirect) {
          navigator(data.redirect);
        } else {
          setData(data);
          setSubmittedListMain(data.studentList);
        }
      })
      .finally(() => setIsLoading(false));
  }, [navigator]);

  const handleSubmit = (sort) => {
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0 && data.studentList.length === 0) return;
    if (sort && Object.keys(sort).length) {
      data.sort = sort;
      setSortList(sort);
    }

    data.submittedList = submittedListMain;
    data.statusCheck = false;
    axios.post(API_ENDPOINT + "/combination/submited/sort", data).then((axiosData) => {
      const data = axiosData.data;
      if (data.isSuccess) {
        setFillter(data.filter);
        setData((prev) => {
          return {
            ...prev,
            studentList: data.submittedListAfterSort
          };
        });
      }
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setScrollStudent(null);
    if (!active || !over || over.id === "list") return setShowClassBar(false);
    toast
      .promise(
        axios.post(API_ENDPOINT + "/ad/student/add/class", {
          studentId: active.id,
          classId: over.id
        }),
        {
          loading: "Đang lưu...",
          success: <b>Đã lưu thành công</b>,
          error: <b>Lưu thất bại</b>
        }
      )
      .then(() => {
        setData((prev) => {
          return {
            ...prev,
            studentList: prev.studentList.filter((item) => item.id !== active.id)
          };
        });
      });
  };

  const handleDragStart = (event) => {
    setScrollStudent(() => data.studentList.find((item) => item.id === event.active.id));
    setShowClassBar(true);
  };

  const visibleTaskLimit = 12;
  const taskOfPage = data?.studentList?.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit);
  const totalPage = Math.ceil((data?.studentList?.length || 0) / visibleTaskLimit);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <form action="" ref={formRef}>
      <DndContext key={String(showClassBar)} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className={cx("wrapper")}>
          <div className={cx("title-box")}>
            <h2 className="fs-2 text-center text-gray-800 fw-bolder mb-4">📋 Danh sách học sinh đã được phê duyệt hồ sơ</h2>
            <p className="fs-3 text-center text-gray-600 fw-medium">
              Danh sách này hiển thị toàn bộ học sinh đã hoàn tất và được phê duyệt hồ sơ tuyển sinh.
            </p>
            <p className="fs-3 text-center text-gray-600 fw-medium">Đây là bước chuẩn bị để tiến hành phân chia vào các lớp học.</p>
          </div>
          {isloading && <Loading />}
          {!showClassBar && (
            <div className={cx("sort-box")}>
              <h4>Phần lọc:</h4>
              <FillterBox defaultValue={fillter} handleSubmit={() => handleSubmit(sortList)} />
            </div>
          )}

          <AnimatePresence>
            {showClassBar && (
              <motion.div
                key="box"
                initial={{ opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                exit={{ opacity: 0, transform: "translateY(10px)" }}
                transition={{ duration: 0.5 }}
              >
                <BarDivideClass show={setShowClassBar} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className={cx("content")}>
            <div className={cx("header-list") + " d-flex align-items-center pb-4 justify-content-between"}>
              <span className="d-flex justify-content-start ms-4 mt-4">Kéo thả để phân chia lớp</span>
              <SortBox handleSubmit={handleSubmit} />
            </div>
            <DroppableList id="list" show={showClassBar}>
              {taskOfPage?.length > 0 ? (
                taskOfPage.map((item, index) => {
                  if (!item.classId) {
                    return (
                      <Col xs={"auto"} key={index}>
                        <StudentItem data={item} detail={false} />
                      </Col>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <NonDataImg />
              )}
            </DroppableList>
            <DragOverlay>{scrollStudent && <DragOverPlayStudent data={scrollStudent} />}</DragOverlay>
          </div>
          <div className="flex justify-center my-4 text-blue-600">
            <Link to="/ad/classmate" className="flex gap-2 items-center">
              Quản lí lớp học
              <FontAwesomeIcon icon={faArrowRight} className="" />
            </Link>
          </div>

          <Stack spacing={2} className="items-center mb-10">
            <Pagination count={totalPage} size="large" color="primary" variant="outlined" shape="rounded" onChange={handleChangePage} />
          </Stack>
        </div>
      </DndContext>
      <BtnSrcollTop />
    </form>
  );
}

export default Students;
