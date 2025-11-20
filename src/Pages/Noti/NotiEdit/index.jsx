import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Generator1 from "../GeneratorNoti/components/generator1";
import Generator2 from "../GeneratorNoti/components/generator2";
import BoxRadius from "../../../Components/BoxRadius";
import Loading from "../../../Components/Loading";
import { API_ENDPOINT } from "../../../constants";

function NotiEdit() {
  const [notiDetail, setNotiDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(API_ENDPOINT + "/notification/edit/" + id)
      .then((axiosData) => {
        const data = axiosData.data;
        if (data.isSuccess) {
          setNotiDetail(data.notification);
        } else {
          navigator("/auth/signin");
        }
      })
      .finally(() => setIsLoading(false));
  }, [navigator, id]);
  return (
    <BoxRadius>
      {isLoading && <Loading />}
      {notiDetail && notiDetail.type === "text" ? (
        <Generator1 data={notiDetail} show btnText="Cập nhật" isUpdate />
      ) : (
        <Generator2 data={notiDetail} show btnText="Cập nhật" isUpdate />
      )}
    </BoxRadius>
  );
}

export default NotiEdit;
