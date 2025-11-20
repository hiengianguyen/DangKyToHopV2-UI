import BoxRadius from "../../../Components/BoxRadius";

import classNames from "classnames/bind";
import style from "./CombinationChart.module.scss";
import MenuTypeChart from "./MenuTypeChart";
import { useEffect, useState } from "react";
import CombinationChosen from "./CombinationChosen";
import CombinationTarget from "./CombinationTarget";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);
function CombinationChart() {
  const [currPage, setCurrPage] = useState(1);
  const [dataChart, setDataChart] = useState({});
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Thống kê";
  }, []);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/combination/analytics").then((axiosData) => {
      if (axiosData.data.isSuccess) {
        setDataChart(axiosData.data);
        setIsLoading(false);
      } else {
        navigator("/auth/signin");
      }
    });
  }, [navigator]);

  return (
    <BoxRadius className={cx("box-radius")}>
      {isLoading && <Loading />}
      <MenuTypeChart currPage={currPage} onNextPage={setCurrPage} />
      <div style={{ padding: "25px" }}>
        <CombinationChosen
          show={currPage === 1}
          labels={dataChart.combinations}
          dataCombination1={dataChart.countCombinaton1}
          dataCombination2={dataChart.countCombinaton2}
          mostChooseOfCombination1={dataChart.mostChooseOfCombination1}
          mostChooseOfCombination2={dataChart.mostChooseOfCombination2}
        />
        <CombinationTarget
          show={currPage === 2}
          labels={dataChart.combinations}
          chosen={dataChart.countCombinaton1}
          empty={dataChart.classesCapacitys}
        />
      </div>
    </BoxRadius>
  );
}

export default CombinationChart;
