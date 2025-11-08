import Tab from "react-bootstrap/Tab";
import CombinationStep1R from "./Components/CombinationStep1R";
import Button from "react-bootstrap/esm/Button";
import CombinationStep2R from "./Components/CombinationStep2R";
import CombinationStep3R from "./Components/CombinationStep3R";
import CombinationStep4R from "./Components/CombinationStep4R";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Tabs from "react-bootstrap/esm/Tabs";
import Container from "react-bootstrap/esm/Container";

function CombinationResult({ valueStudent = {}, setCurrPage = () => {} }) {
  const navigator = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Xác nhận thông tin";
  }, []);

  const handleSubmit = () => {
    valueStudent.userId = auth.user.userId;
    toast
      .promise(
        axios.post("http://localhost:4001/combination/submited", valueStudent),
        {
          loading: "Đang gữi đi hồ sơ...",
          success: <b>Gữi thành công!</b>,
          error: <b>Gữi thất bại.</b>,
        }
      )
      .then(() => navigator("/combination/detail"));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <Button
          primary="true"
          onClick={() => setCurrPage(4)}
          className="fs-3 px-4"
        >
          Trở lại
        </Button>
        <Button primary="true" onClick={handleSubmit} className="fs-3 px-4">
          Gửi đi
        </Button>
      </div>
      <Container>
        <Tabs defaultActiveKey="home" className="mb-3">
          <Tab eventKey="home" title="1. Thông tin chung">
            <CombinationStep1R valueStudent={valueStudent} />
          </Tab>
          <Tab eventKey="profile" title="2. Đơn xin nhập học">
            <CombinationStep2R valueStudent={valueStudent} />
          </Tab>
          <Tab eventKey="longer-tab" title="3. Chọn tổ hợp">
            <CombinationStep3R valueStudent={valueStudent} />
          </Tab>
          <Tab eventKey="contact" title="4. Lý lịch học sinh">
            <CombinationStep4R valueStudent={valueStudent} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default CombinationResult;
