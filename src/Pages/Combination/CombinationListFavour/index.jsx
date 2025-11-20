import BoxRadius from "../../../Components/BoxRadius";
import FilterBox from "../CombinationList/Components/FilterBox";
import SearchName from "../CombinationList/Components/SearchName";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useEffect, useState, useRef } from "react";
import CardStudent from "../CombinationList/Components/CardStudent";
import SortBox from "../CombinationList/Components/SortBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { useAuth } from "../../../Contexts/AuthContext";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import NonDataImg from "../../ClassDivide/Students/Component/NonDataImg";
import { API_ENDPOINT } from "../../../constants";

function CombinationListFavour() {
  const formRef = useRef();
  const navigator = useNavigate();
  const [formElement, setFormElement] = useState();
  const [submittedList, setSubmittedList] = useState([]);
  const [submittedListMain, setSubmittedListMain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { auth } = useAuth();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFormElement(formRef.current);
  }, []);

  useEffect(() => {
    const userId = auth?.user?.userId;
    axios
      .post(API_ENDPOINT + "/combination/submited-list/saved", {
        userId: userId,
      })
      .then((axiosData) => {
        const data = axiosData.data;
        if (data.isSuccess) {
          setSubmittedList(data.submitedList);
          setSubmittedListMain(data.submitedList);
        } else {
          navigator("/auth/signin");
        }
      })
      .finally(() => setIsLoading(false));
  }, [navigator, auth?.user?.userId]);

  const handleSubmit = (sort) => {
    setIsLoadingList(true);
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    if (Object.keys(data).length === 0 && submittedList.length === 0) return;
    sort && (data.sort = sort);
    data.submittedList = submittedListMain;
    axios
      .post(API_ENDPOINT + "/combination/submited/sort", data)
      .then((axiosData) => {
        if (axiosData.data.isSuccess) {
          setSubmittedList(axiosData.data.submittedListAfterSort);
        }
      })
      .finally(() => setIsLoadingList(false));
  };

  const handleExportExcel = () => {
    setIsLoading(true);
    axios
      .post(
        API_ENDPOINT + "/file/excel/filter-submited-list",
        { submittedList: submittedList },
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
      })
      .finally(() => setIsLoading(false));
  };

  const visibleTaskLimit = 12;
  const submittedOfPage = submittedList.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  const totalPage = Math.ceil(submittedList.length / visibleTaskLimit);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <BoxRadius>
      {isLoading && <Loading />}
      <div className="d-flex justify-content-between" style={{ height: "3pc" }}>
        <h2>Danh sách hồ sơ đã lưu</h2>
        <DropdownButton drop="start" size="lg" title="Xuất file Excel">
          <Dropdown.Item
            className="fs-2 p-3"
            href={API_ENDPOINT + "/file/excel/submited-list"}
          >
            Tất cả hồ sơ
          </Dropdown.Item>
          <Dropdown.Item className="fs-2 p-3" onClick={handleExportExcel}>
            Hồ sơ đã lọc
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <form action="" ref={formRef}>
        <div className="d-flex justify-content-between align-items-center">
          <SearchName handleSubmit={handleSubmit} />
          <SortBox handleSubmit={handleSubmit} />
        </div>
        <Row>
          <Col xs={"auto"}>
            <FilterBox
              handleSubmit={handleSubmit}
              name="gender"
              title="Giới tính"
              options={[
                {
                  title: "Tất cả",
                  value: "Tất cả",
                },
                {
                  title: "Nam",
                  value: "Nam",
                },
                {
                  title: "Nữ",
                  value: "Nữ",
                },
              ]}
            />
          </Col>
          <Col>
            <FilterBox
              handleSubmit={handleSubmit}
              name="combination1"
              title="Nguyện vọng 1"
              options={[
                {
                  title: "Tất cả",
                  value: "Tất cả",
                },
                {
                  title: "Tổ hợp 1",
                  value: "Tổ hợp 1",
                },
                {
                  title: "Tổ hợp 2",
                  value: "Tổ hợp 2",
                },
                {
                  title: "Tổ hợp 3",
                  value: "Tổ hợp 3",
                },
                {
                  title: "Tổ hợp 4",
                  value: "Tổ hợp 4",
                },
                {
                  title: "Tổ hợp 5",
                  value: "Tổ hợp 5",
                },
              ]}
            />
          </Col>
          <Col>
            <FilterBox
              handleSubmit={handleSubmit}
              name="combination2"
              title="Nguyện vọng 2"
              options={[
                {
                  title: "Tất cả",
                  value: "Tất cả",
                },
                {
                  title: "Tổ hợp 1",
                  value: "Tổ hợp 1",
                },
                {
                  title: "Tổ hợp 2",
                  value: "Tổ hợp 2",
                },
                {
                  title: "Tổ hợp 3",
                  value: "Tổ hợp 3",
                },
                {
                  title: "Tổ hợp 4",
                  value: "Tổ hợp 4",
                },
                {
                  title: "Tổ hợp 5",
                  value: "Tổ hợp 5",
                },
              ]}
            />
          </Col>
          <Col>
            <FilterBox
              handleSubmit={handleSubmit}
              name="status"
              title="Trạng thái"
              options={[
                {
                  title: "Tất cả",
                  value: "Tất cả",
                },
                {
                  title: "Đã nộp",
                  value: "Đã nộp",
                },
                {
                  title: "Đã phê duyệt",
                  value: "Đã phê duyệt",
                },
                {
                  title: "Đã huỷ phê duyệt",
                  value: "Đã huỷ phê duyệt",
                },
              ]}
            />
          </Col>
        </Row>

        <Row as={Col} className="mt-4 position-relative">
          {submittedOfPage.length ? (
            submittedOfPage.map((item, index) => (
              <Col xs={"auto"} key={index}>
                <CardStudent data={item} />
              </Col>
            ))
          ) : (
            <NonDataImg />
          )}
          {isLoadingList && (
            <Loading
              height="100%"
              position="absolute"
              color="rgb(244 244 244)"
              zIndex="9998"
            />
          )}
        </Row>
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
            size="large"
            color="primary"
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </form>
    </BoxRadius>
  );
}

export default CombinationListFavour;
