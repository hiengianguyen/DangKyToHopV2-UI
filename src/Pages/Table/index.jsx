import classNames from "classnames/bind";
import style from "./Table.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import BoxRadius from "../../Components/BoxRadius";
import Table from "react-bootstrap/Table";
import ModalEditTable from "./Modal";

const cx = classNames.bind(style);

function TablePage() {
  const [combinationModalID, setCombinationModalID] = useState("");
  const [combinations, setCombinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4001/combination/table")
      .then((axiosData) => {
        if (axiosData.data.isSuccess) {
          setCombinations(axiosData.data.combinations);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleEditCombination = (id) => {
    setCombinationModalID(id);
    setIsShowModal(true);
  };

  return (
    <BoxRadius>
      <div className={cx("wrapper")}>
        {isLoading && <Loading title="Đang tải tổ hợp" />}
        <h1 className="mb-4 fs-1 fw-bold">Chỉnh sửa tổ hợp</h1>
        <div className="table-combination">
          <Table striped className={cx("text-center", "table-edit")}>
            <thead>
              <tr>
                <th>Tổ hợp</th>
                <th>Môn lựa chọn (04 môn)</th>
                <th>Cụm chuyên đề (03 môn)</th>
                <th>Số lớp</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {combinations &&
                combinations.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.optionalSubjects.join(", ")}</td>
                    <td>{item?.compulsorySubjects.join(", ")}</td>
                    <td>{item?.classesCount}</td>
                    <td>
                      <div className="btn btn-secondary fs-3" onClick={() => handleEditCombination(item?.id)}>
                        Chỉnh sửa
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      {combinations &&
        combinations.map((item, index) => {
          if (item?.id !== combinationModalID) return null;
          return (
            <ModalEditTable
              key={index}
              isShow={isShowModal}
              setShow={setIsShowModal}
              combination={item}
              setCombinations={setCombinations}
            />
          );
        })}
    </BoxRadius>
  );
}

export default TablePage;
