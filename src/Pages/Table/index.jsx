import classNames from "classnames/bind";
import style from "./Table.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import BoxRadius from "../../Components/BoxRadius";
import ModalEditTable from "./Modal";

const cx = classNames.bind(style);

function TablePage() {
  const [combinationModalID, setCombinationModalID] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4001/combination/table")
      .then((axiosData) => {
        if (axiosData.data.isSuccess) {
          setDataTable(axiosData.data);
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
        <div className="flex items-center gap-8 bg-orange-50 border-s-4 border-orange-400 mb-10 py-4">
          <svg className="size-10 text-amber-500 ms-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex flex-col gap-2">
            <h1 className="fw-bold text-orange-900">CHÚ Ý QUAN TRỌNG</h1>
            <span className="text-orange-800">Việc thay đổi môn học trong tổ hợp có thể ảnh hưởng đến dữ liệu <b className="text-yellow-800">đăng ký nguyện vọng</b> của học sinh. Vui lòng kiểm tra kỹ số lượng lớp dự kiến và các môn chuyên đề trước khi lưu thay đổi.</span>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex justify-between items-center w-100 rounded-lg bg-blue-50 border border-blue-100 p-4">
            <div className="flex flex-col gap-4">
              <h1 className="fw-bold text-blue-600">Tổng số tổ hợp</h1>
              <span className="fs-1 fw-bold text-blue-800">{dataTable.combinationLength || 0}</span>
            </div>
            <div className="rounded-full size-20 bg-blue-200 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5" stroke="#000000" stroke-linejoin="round"/>
                <path d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471" stroke="#000000" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center w-100 rounded-lg bg-blue-50 border border-blue-100 p-4">
            <div className="flex flex-col gap-4">
              <h1 className="fw-bold text-blue-600">Tổng số lớp dự kiến</h1>
              <span className="fs-1 fw-bold text-blue-800">{dataTable.classCount || 0}</span>
            </div>
            <div className="rounded-full size-20 bg-blue-200 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" viewBox="0 0 24 24" fill="none">
                <path d="M3 15L3.92359 3.91695C3.96678 3.39866 4.40004 3 4.92013 3H19.0799C19.6 3 20.0332 3.39866 20.0764 3.91695L21 15M3 15V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V15M3 15H9C9 16 9.6 18 12 18C14.4 18 15 16 15 15H21" stroke="#000000" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center w-100 rounded-lg bg-blue-50 border border-blue-100 p-4">
            <div className="flex flex-col gap-4">
              <h1 className="fw-bold text-blue-600">Tổng số học sinh dự kiến</h1>
              <span className="fs-1 fw-bold text-blue-800">{dataTable.classCount*40 || 0}</span>
            </div>
            <div className="rounded-full size-20 bg-blue-200 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" viewBox="0 0 20 20" version="1.1">
                <path d="M 9.5 0 C 8.1252105 0 7 1.1252105 7 2.5 C 7 3.0633617 7.1940199 3.5807403 7.5117188 4 L 7.5 4 C 6.1252115 4 5 5.12521 5 6.5 L 5 10.5 C 5 11.702941 5.8636264 12.715051 7 12.949219 L 7 18.5 C 7 19.328427 7.6715729 20 8.5 20 L 10.5 20 C 11.328427 20 12 19.328427 12 18.5 L 12 12.949219 L 12.001953 12.949219 C 13.13828 12.715051 14 11.702941 14 10.5 L 14 6.5 C 14 5.12521 12.874789 4 11.5 4 L 11.488281 4 C 11.805981 3.5807403 12 3.0633617 12 2.5 C 12 1.1252105 10.87479 0 9.5 0 z M 4.5 1 C 4.285138 1.0000001 4.0801864 1.0362656 3.8808594 1.0878906 C 3.8543284 1.0950956 3.8289194 1.1032681 3.8027344 1.1113281 C 3.6122454 1.1674598 3.4326019 1.2442769 3.2636719 1.3417969 C 2.5137879 1.7746902 2 2.5766257 2 3.5 C 2 4.0633617 2.1940148 4.5807403 2.5117188 5 L 2.5 5 C 1.125211 5 0 6.12521 0 7.5 L 0 10.5 C -1.4802974e-016 11.702941 0.86190784 12.715051 1.9980469 12.949219 L 2 12.949219 L 2 16.5 C 2 17.328427 2.671573 18 3.5 18 L 5 18 L 6 18 L 6 17 L 5 17 L 5 14.910156 L 5 13.5 C 5 13.223858 4.776142 13 4.5 13 C 4.223858 13 4 13.223858 4 13.5 L 4 17 L 3.5 17 C 3.223858 17 3 16.776142 3 16.5 L 3 8.5 C 3 8.2238576 2.776142 8 2.5 8 C 2.223858 8 2 8.2238576 2 8.5 L 2 11.910156 C 1.416196 11.705514 1 11.157682 1 10.5 L 1 7.5 C 1 6.66565 1.66565 6 2.5 6 L 2.5117188 6 C 3.0640037 6 3.5117188 5.5522848 3.5117188 5 C 3.5111458 4.782732 3.440444 4.5712218 3.28125 4.3574219 C 3.122056 4.1436221 3 3.8417718 3 3.5 C 3 2.6656506 3.66565 2 4.5 2 C 4.788118 2 5.0528871 2.0814481 5.2050781 2.1738281 C 5.3572691 2.2662078 5.4473025 2.2925337 5.5390625 2.2929688 C 5.8152055 2.2929688 6.0390625 2.0691111 6.0390625 1.7929688 C 6.0390215 1.6415092 5.9671356 1.5075681 5.8847656 1.4394531 C 5.8023906 1.3713371 5.7722744 1.3560969 5.7402344 1.3417969 C 5.3733144 1.128618 4.952744 1 4.5 1 z M 9.5 1 C 10.33435 1 11 1.6656505 11 2.5 C 11 2.8417718 10.877896 3.1436223 10.71875 3.3574219 C 10.559605 3.5712214 10.488843 3.7827376 10.488281 4 C 10.488281 4.5522847 10.935996 5 11.488281 5 L 11.5 5 C 12.33435 5 13 5.66565 13 6.5 L 13 10.5 C 13 11.157682 12.583804 11.705514 12 11.910156 L 12 7.5 C 12 7.2238576 11.776142 7 11.5 7 C 11.223858 7 11 7.2238576 11 7.5 L 11 18.5 C 11 18.776142 10.776142 19 10.5 19 L 10 19 L 10 13.5 C 10 13.223858 9.7761424 13 9.5 13 C 9.2238576 13 9 13.223858 9 13.5 L 9 19 L 8.5 19 C 8.2238576 19 8 18.776142 8 18.5 L 8 7.5 C 8 7.2238576 7.7761424 7 7.5 7 C 7.2238576 7 7 7.2238576 7 7.5 L 7 11.910156 C 6.4161964 11.705514 6 11.157682 6 10.5 L 6 6.5 C 6 5.66565 6.6656505 5 7.5 5 L 7.5117188 5 C 8.0640035 5 8.5117188 4.5522847 8.5117188 4 C 8.5111567 3.7827376 8.4403749 3.5712202 8.28125 3.3574219 C 8.1221251 3.1436236 8 2.8417718 8 2.5 C 8 1.6656505 8.6656505 1 9.5 1 z M 14.5 1 C 14.047256 1 13.626686 1.128618 13.259766 1.3417969 C 13.227726 1.3560969 13.197609 1.3713371 13.115234 1.4394531 C 13.032864 1.5075681 12.960978 1.6415091 12.960938 1.7929688 C 12.960938 2.0691111 13.184795 2.2929688 13.460938 2.2929688 C 13.552698 2.2925337 13.642731 2.2662078 13.794922 2.1738281 C 13.947113 2.0814481 14.211882 2 14.5 2 C 15.33435 2 16 2.6656505 16 3.5 C 16 3.8417718 15.877944 4.1436221 15.71875 4.3574219 C 15.559556 4.5712218 15.488854 4.782732 15.488281 5 C 15.488281 5.5522847 15.935996 6 16.488281 6 L 16.5 6 C 17.33435 6 18 6.66565 18 7.5 L 18 10.5 C 18 11.157682 17.583804 11.705514 17 11.910156 L 17 8.5 C 17 8.2238576 16.776142 8 16.5 8 C 16.223858 8 16 8.2238576 16 8.5 L 16 16.5 C 16 16.776142 15.776142 17 15.5 17 L 15 17 L 15 13.5 C 15 13.223858 14.776142 13 14.5 13 C 14.223858 13 14 13.223858 14 13.5 L 14 14.910156 L 14 17 L 13 17 L 13 18 L 14 18 L 15.5 18 C 16.328427 18 17 17.328427 17 16.5 L 17 12.949219 L 17.001953 12.949219 C 18.138092 12.715051 19 11.702941 19 10.5 L 19 7.5 C 19 6.12521 17.874789 5 16.5 5 L 16.488281 5 C 16.805985 4.5807403 17 4.0633617 17 3.5 C 17 2.5766256 16.486212 1.7746902 15.736328 1.3417969 C 15.567398 1.2442766 15.387755 1.1674598 15.197266 1.1113281 C 15.171081 1.1032638 15.145672 1.0950959 15.119141 1.0878906 C 14.919814 1.0362653 14.714862 1 14.5 1 z "/>
              </svg>
            </div>
          </div>
        </div>
        <div className="table mt-10">
          <table className={cx("text-center table-auto border border-collapse w-100")}>
            <thead className="border">
              <tr>
                <th className="p-4 border-b border-gray-200">STT</th>
                <th className="p-4 border-b border-gray-200">Tổ hợp</th>
                <th className="p-4 border-b border-gray-200">Môn lựa chọn (04 môn)</th>
                <th className="p-4 border-b border-gray-200">Cụm chuyên đề (03 môn)</th>
                <th className="p-4 border-b border-gray-200">Số lớp</th>
                <th className="p-4 border-b border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {dataTable.combinations &&
                dataTable.combinations.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="p-4 fs-2 text-center text-gray-600">{index + 1}</td>
                    <td className="p-4 fs-2 text-center text-black fw-bold">{item?.name}</td>
                    <td className="p-4 fs-2 text-center text-gray-600">{item?.optionalSubjects.join(", ")}</td>
                    <td className="p-4 fs-2 text-center text-gray-600">{item?.compulsorySubjects.join(", ")}</td>
                    <td className="p-4 fs-2 text-center text-indigo-800 fw-bold">{item?.classesCount}</td>
                    <td className="p-4 fs-2 text-center text-gray-600">
                      <div className="btn btn-secondary fs-3" onClick={() => handleEditCombination(item?.id)}>
                        Chỉnh sửa
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {dataTable.combinations &&
        dataTable.combinations.map((item, index) => {
          if (item?.id !== combinationModalID) return null;
          return (
            <ModalEditTable
              key={index}
              isShow={isShowModal}
              setShow={setIsShowModal}
              combination={item}
              setCombinations={setDataTable}
            />
          );
        })}
    </BoxRadius>
  );
}

export default TablePage;
