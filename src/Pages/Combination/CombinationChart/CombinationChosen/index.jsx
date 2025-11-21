import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import classNames from "classnames/bind";
import style from "./CombinationChosen.module.scss";
const cx = classNames.bind(style);

function CombinationChosen({
  show = false,
  labels = [],
  dataCombination1 = [],
  dataCombination2 = [],
  mostChooseOfCombination1 = {},
  mostChooseOfCombination2 = {}
}) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Số lượng học sinh chọn các tổ hợp"
      }
    }
  };
  const data = {
    combination1: {
      labels,
      datasets: [
        {
          label: "Nguyện vọng 1",
          data: dataCombination1,
          borderColor: "rgb(44, 175, 254)",
          backgroundColor: "rgba(44, 175, 254, 0.5)"
        }
      ]
    },
    combination2: {
      labels,
      datasets: [
        {
          label: "Nguyện vọng 2",
          data: dataCombination2,
          borderColor: "rgb(0, 226, 114)",
          backgroundColor: "rgba(0, 226, 114, 0.5)"
        }
      ]
    }
  };

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <div className={cx("title", 'text-center')}>
        <h3>Biểu đồ thống kê số lượng học sinh chọn các tổ hợp</h3>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("chart")}>
          <div className={cx("quantity-box", "desktop")}>
            <div className={cx("most-combination")}>
              <h4> Nguyện vọng 1</h4>
              <p className={cx("offical")} style={{ color: "#2caffe" }}>
                {mostChooseOfCombination1.count}
              </p>
              <p className={cx("des")}>Học sinh chọn {mostChooseOfCombination1.combination}</p>
            </div>
            <Line options={options} data={data.combination1} className={cx("chart-detail")} />
          </div>
          <div className={cx("quantity-box", "desktop")}>
            <div className={cx("most-combination")}>
              <h4> Nguyện vọng 2</h4>
              <p className={cx("offical")} style={{ color: "#00e272" }}>
                {mostChooseOfCombination2.count}
              </p>
              <p className={cx("des")}>Học sinh chọn {mostChooseOfCombination2.combination}</p>
            </div>
            <Line options={options} data={data.combination2} className={cx("chart-detail")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinationChosen;
