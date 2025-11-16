import classNames from "classnames/bind";
import style from "./TablePoints.module.scss";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function TablePoints({ valueStudent = {}, readOnly = false }) {
  const [mathPoint, setMathPoint] = useState(Number(valueStudent.mathPoint) || 0);
  const [literaturePoint, setLiteraturePoint] = useState(Number(valueStudent.literaturePoint) || 0);
  const [englishPoint, setEnglishPoint] = useState(Number(valueStudent.englishPoint) || 0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (mathPoint + literaturePoint + englishPoint === 0) return;
    setTotal(mathPoint + literaturePoint + englishPoint);
  }, [mathPoint, literaturePoint, englishPoint]);

  useEffect(() => {
    if (valueStudent === undefined) return;
    console.log("change");

    setTotal(Number(valueStudent.mathPoint) + Number(valueStudent.literaturePoint) + Number(valueStudent.englishPoint));
  }, [valueStudent]);

  const minMaxPoint = (point) => {
    const pointFinal = Number(point);
    if (pointFinal < 0) {
      return 0;
    } else if (pointFinal > 10) {
      return 10;
    }
    return pointFinal;
  };
  return (
    <Table striped className={cx("wrapper")}>
      <thead>
        <tr>
          <th colSpan={4}>Điểm thi tuyển vào lớp 10</th>
          <th rowSpan={2}>Tổng điểm xét tuyển HL, RL 4 năm THCS</th>
          <th rowSpan={2}>Tổng điểm trúng tuyển</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Toán</td>
          <td>Văn</td>
          <td>T. Anh</td>
          <td>Tổng điểm 3 môn</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            {readOnly ? (
              <span className={cx("inp-man")}>{valueStudent.mathPoint}</span>
            ) : (
              <Form.Control
                required
                type="number"
                onChange={(e) => setMathPoint(minMaxPoint(e.target.value))}
                min={0}
                max={10}
                step={0.1}
                name="mathPoint"
                defaultValue={valueStudent.mathPoint || mathPoint}
                className={cx("inp-man")}
              />
            )}
          </td>
          <td>
            {readOnly ? (
              <span className={cx("inp-man")}>{valueStudent.literaturePoint}</span>
            ) : (
              <Form.Control
                required
                type="number"
                onChange={(e) => setLiteraturePoint(minMaxPoint(e.target.value))}
                min={0}
                max={10}
                step={0.1}
                name="literaturePoint"
                defaultValue={valueStudent.literaturePoint || literaturePoint}
                className={cx("inp-man")}
              />
            )}
          </td>
          <td>
            {readOnly ? (
              <span className={cx("inp-man")}>{valueStudent.englishPoint}</span>
            ) : (
              <Form.Control
                required
                type="number"
                onChange={(e) => setEnglishPoint(minMaxPoint(e.target.value))}
                min={0}
                max={10}
                step={0.1}
                name="englishPoint"
                defaultValue={valueStudent.englishPoint || englishPoint}
                className={cx("inp-man")}
              />
            )}
          </td>
          <td>
            <span className={cx("total-point")}>{total && total.toFixed(1)}</span>
          </td>
          <td>
            {readOnly ? (
              <span className={cx("inp-man")}>{valueStudent.conductPoint ?? 1.75}</span>
            ) : (
              <Form.Control
                required
                type="number"
                min={1.75}
                max={10}
                step={0.25}
                name="conductPoint"
                defaultValue={valueStudent.conductPoint || 1.75}
                className={cx("inp-man")}
              />
            )}
          </td>
          <td>
            {readOnly ? (
              <span className={cx("inp-man")}>{valueStudent.admissionPoint ?? 0}</span>
            ) : (
              <Form.Control
                required
                type="number"
                name="admissionPoint"
                defaultValue={valueStudent.admissionPoint || 0}
                className={cx("inp-man")}
              />
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TablePoints;
