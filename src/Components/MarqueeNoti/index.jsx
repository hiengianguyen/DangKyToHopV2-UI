import axios from "axios";
import style from "./MarqueeNoti.module.scss";
import classNames from "classnames/bind";

import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../constants";

const cx = classNames.bind(style);

function MarqueeNoti() {
  const [listNoti, setListNoti] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/notification").then((axiosData) => {
      setListNoti(axiosData.data.notifications);
    });
  }, []);
  return (
    <div className={cx("ShortArticle")}>
      <Marquee
        className={cx("marquee-box")}
        pauseOnHover
        scrollamount="5"
        scrolldelay="5"
        direction="left"
      >
        <div className={cx("block-row")}>
          {listNoti &&
            listNoti.map((item, index) => (
              <Link key={index} to={"/notifications/" + item.id}>
                <p className={cx("title-noti")} title={item.title}>
                  {item.title}
                </p>
              </Link>
            ))}
        </div>
      </Marquee>
    </div>
  );
}

export default MarqueeNoti;
