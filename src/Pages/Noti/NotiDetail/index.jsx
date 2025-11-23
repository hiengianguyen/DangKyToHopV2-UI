import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import style from "../Noti.module.scss";
import BoxRadius from "../../../Components/BoxRadius";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../Components/Loading";
import { API_ENDPOINT } from "../../../constants";

const cx = classNames.bind(style);

function NotiDetail() {
  const [notiDetail, setNotiDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (!notiDetail) return;
    document.title = notiDetail.title || "Thông báo";
  }, [notiDetail]);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/notification/detail/" + id).then((axiosData) => {
      if (axiosData.data.isSuccess) {
        setNotiDetail(axiosData.data.notification);
        setLoading(false);
      } else {
        navigator("/auth/signin");
      }
    });
  }, [id, navigator]);

  return (
    <BoxRadius>
      {loading && <Loading title="Đang tải thông báo" />}
      <div className={cx("card-body", "p-0")}>
        <div className={cx("content")}>
          <h4 className={cx("mb-2", "text-center")}>Thông báo</h4>
          <div className={cx("container", "mt-4")}>
            <h3 className={cx("text-center", "fs-1 fw-bolder mb-4")}>{notiDetail.title}</h3>
            {notiDetail.type === "text" ? (
              <>
                <p className="text-justify fs-2 fw-medium">{notiDetail.message}</p>
                <div className={cx("timer", "d-flex", "justify-content-end")}>
                  <p>Thông báo lúc: {notiDetail.publishAt}</p>
                </div>{" "}
              </>
            ) : (
              <>
                <a
                  className="btn btn-primary text-white"
                  href={`https://docs.google.com/document/d/e/${notiDetail.fileUrl}?embedded=true`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Đường dẫn file chi tiết
                </a>
                <div className={cx("file-container", "mt-3", "d-flex", "justify-content-center", "shadow", "p-4")}>
                  <iframe
                    title={notiDetail.title}
                    src={`https://docs.google.com/document/d/e/${notiDetail.fileUrl}?embedded=true`}
                  ></iframe>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </BoxRadius>
  );
}

export default NotiDetail;
