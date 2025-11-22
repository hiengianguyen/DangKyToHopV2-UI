import classNames from "classnames/bind";
import style from "./CombinationRegister.module.scss";
import BoxRadius from "../../../Components/BoxRadius";
import ProgressBar from "../../../Components/ProgressBar/index.jsx";
import CombinationStep1 from "../CombinationSteps/CombinationStep1";
import CombinationStep2 from "../CombinationSteps/CombinationStep2";
import CombinationStep3 from "../CombinationSteps/CombinationStep3";
import CombinationStep4 from "../CombinationSteps/CombinationStep4";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CombinationResult from "../CombinationSteps/CombinationResult/index.jsx";
import Loading from "../../../Components/Loading/index.jsx";
import { API_ENDPOINT } from "../../../constants/index.js";

const cx = classNames.bind(style);

function RegisterCombination() {
  const navigator = useNavigate();
  const [currPage, setCurrPage] = useState(1);
  const [dataOfPage, setDataOfPage] = useState({});
  const [valueStudent, setValueStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_ENDPOINT + "/combination/submit-combination")
      .then((axiosData) => {
        const data = axiosData.data;
        if (data.isSuccess) {
          if (data.submitedDetail) {
            setValueStudent(data.submitedDetail);
          }
          setDataOfPage(data);
          setIsLoading(false);
        } else {
          navigator("/auth/signin");
        }
      });
  }, [navigator]);

  const renderStep = () => {
    switch (currPage) {
      case 1:
        return (
          <CombinationStep1
            setValueStudent={setValueStudent}
            valueStudent={valueStudent}
            nations={dataOfPage.nations}
            secondarySchools={dataOfPage.secondarySchools}
            setCurrPage={setCurrPage}
          />
        );
      case 2:
        return (
          <CombinationStep2
            valueStudent={valueStudent}
            setValueStudent={setValueStudent}
            setCurrPage={setCurrPage}
          />
        );
      case 3:
        return (
          <CombinationStep3
            valueStudent={valueStudent}
            setValueStudent={setValueStudent}
            setCurrPage={setCurrPage}
          />
        );
      case 4:
        return (
          <CombinationStep4
            valueStudent={valueStudent}
            setValueStudent={setValueStudent}
            setCurrPage={setCurrPage}
          />
        );
      default:
        return (
          <CombinationResult
            valueStudent={valueStudent}
            setCurrPage={setCurrPage}
          />
        );
    }
  };

  return (
    <div className={cx("wrapper")}>
      {isLoading && <Loading />}
      <BoxRadius>
        <ProgressBar step={currPage} />
      </BoxRadius>

      <BoxRadius>{renderStep()}</BoxRadius>
    </div>
  );
}

export default RegisterCombination;
