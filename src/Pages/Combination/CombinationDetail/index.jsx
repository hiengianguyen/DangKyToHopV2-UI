import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CombinationStep1R from "./../CombinationSteps/CombinationResult/Components/CombinationStep1R";
import CombinationStep2R from "./../CombinationSteps/CombinationResult/Components/CombinationStep2R";
import CombinationStep3R from "./../CombinationSteps/CombinationResult/Components/CombinationStep3R";
import CombinationStep4R from "./../CombinationSteps/CombinationResult/Components/CombinationStep4R";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import BoxRadius from "../../../Components/BoxRadius";
import Loading from "../../../Components/Loading";
import BtnActions from "./BtnActions";
import Container from "react-bootstrap/esm/Container";

function CombinationDetail() {
  const [submitedDetail, setSubmitedDetail] = useState();
  const [key, setKey] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();
  const { auth } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Hồ sơ đã nộp";
  }, []);

  useEffect(() => {
    if (!auth?.user?.userId) return;
    let userId = auth?.user?.userId;
    if (id) userId = id;
    axios
      .get("http://localhost:4001/combination/submited-detail/" + userId)
      .then((axiosData) => {
        if (axiosData.data.isSuccess) {
          setSubmitedDetail(axiosData.data.submitedCombinationDetail);
        } else {
          navigator("/auth/signin");
        }
      })
      .finally(() => setIsLoading(false));
  }, [navigator, auth?.user?.userId, id]);

  return (
    <BoxRadius>
      {isLoading && <Loading title="Đang tải hồ sơ" />}
      <Container>
        <Tabs defaultActiveKey="1" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="1" title="1. Thông tin chung">
            <CombinationStep1R valueStudent={submitedDetail} role={auth?.user?.role} />
          </Tab>
          <Tab eventKey="2" title="2. Đơn xin nhập học">
            <CombinationStep2R valueStudent={submitedDetail} role={auth?.user?.role} />
          </Tab>
          <Tab eventKey="3" title="3. Chọn tổ hợp">
            <CombinationStep3R valueStudent={submitedDetail} role={auth?.user?.role} />
          </Tab>
          <Tab eventKey="4" title="4. Lý lịch học sinh">
            <CombinationStep4R valueStudent={submitedDetail} role={auth?.user?.role} />
          </Tab>
        </Tabs>
        {submitedDetail && <BtnActions keyPage={key} userId={submitedDetail.userId} disabled={submitedDetail.status === "approved"} />}
      </Container>
    </BoxRadius>
  );
}

export default CombinationDetail;
