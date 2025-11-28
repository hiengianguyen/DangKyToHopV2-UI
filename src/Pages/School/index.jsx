import classNames from "classnames/bind";
import style from "./School.module.scss";
import Container from "react-bootstrap/Container";
import SwiperImg from "./SwiperImg";
import { useEffect, useState } from "react";
import axios from "axios";
import BoxContentAndImg from "./BoxContentAndImg";
import MainContentSchool from "./MainContentSchool";
import TrophiContainer from "./TrophiContainer";
import SchoolStats from "./SchoolStats";
import SchoolMap from "./SchoolMap";
import Loading from "../../Components/Loading";
import { useMediaQuery } from "react-responsive";
import { API_ENDPOINT } from "../../constants";

const cx = classNames.bind(style);

const Pc = ({ children }) => {
  const isPc = useMediaQuery({ minWidth: 1400 });
  return isPc ? children : null;
};
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1400 });
  return isDesktop ? children : null;
};

function School() {
  const [imgActivity, setImgActivity] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Trường học";
  }, []);

  useEffect(() => {
    axios.get(API_ENDPOINT + "/school").then((axiosData) => {
      setImgActivity(axiosData.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <Pc>
        <div className={cx("wrapper")}>
          {isLoading && <Loading />}
          <div className={cx("content-1")}>
            <BoxContentAndImg
              imgUrl="https://res.cloudinary.com/dwoymvppw/image/upload/v1752892084/phoca_thumb_l_img_0188_ucfe6j.jpg"
              desImg="Trường học giai đoạn đầu"
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1752893673/73141113_730983574035387_2818179285607514112_n.jpg_plvcef.jpg"
              imgWidth="35pc"
            >
              <h3 className="mb-6">Thông tin trường học</h3>
              <p className={cx("text-img")}>
                Trường Trung học phổ thông (THPT) Duy Tân là một cơ sở giáo dục công lập tọa lạc tại Phường Quảng Phú, TP. Đà Nẵng. Được
                thành lập vào năm 2010 theo Quyết định số 1119/QĐ-UBND của UBND tỉnh Quảng Nam (cũ), trường nhằm tạo điều kiện thuận lợi cho
                việc học tập của học sinh tại các xã phường như: Phường Quảng Phú, phường Tam Kỳ, phường Hương Trà, phường Bàn Thạch, xã
                Thăng Trường, xã Tam Xuân.
              </p>
            </BoxContentAndImg>
          </div>

          <div className={cx("content-2")}>
            <Container>
              <p className="fs-2 text-gray-800">
                Trong những năm đầu hoạt động, trường chưa có cơ sở riêng và phải mượn cơ sở cũ của Trường THCS Lý Thường Kiệt tại thôn Phú
                Thạnh, xã Tam Phú (cũ) để tổ chức dạy học. Đến tháng 8 năm 2016, trường mới chuyển về cơ sở mới tại thôn Ngọc Mỹ, xã Tam Phú
                (cũ).
              </p>
            </Container>
            <SwiperImg data={imgActivity.imgSchool} />
          </div>

          <MainContentSchool />

          <div className={cx("content-4")}>
            <Container>
              <div className={cx("main-content")}>
                <h4 className="mb-6">Hoạt động dành cho học sinh</h4>
                <p>
                  Bên cạnh việc học tập, Trường THPT Duy Tân luôn chú trọng phát triển toàn diện cho học sinh thông qua nhiều hoạt động
                  ngoại khóa phong phú như: hội trại truyền thống, câu lạc bộ học thuật, thể thao, văn nghệ và các chương trình thiện nguyện
                  ý nghĩa. Những sân chơi này không chỉ giúp học sinh thư giãn mà còn rèn luyện kỹ năng sống, tinh thần đồng đội và sự tự
                  tin.
                </p>
                <p>Dưới đây là một số hình ảnh tiêu biểu ghi lại khoảnh khắc đáng nhớ trong các hoạt động tại trường:</p>
              </div>
            </Container>

            <BoxContentAndImg
              isSwiper
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1749179561/BE_GIANG_DT_22_lhjusl.jpg"
              listImg={imgActivity.imgStudentDancings}
            >
              <h3 className="mb-6">Nghệ thuật</h3>
              <p className={cx("text-img")}>
                Hoạt động văn nghệ là điểm nhấn nổi bật trong đời sống học đường tại Trường THPT Duy Tân. Hàng năm, nhà trường tổ chức nhiều
                chương trình biểu diễn như Hội diễn chào mừng năm học mới, Văn nghệ tri ân thầy cô 20/11, và Tết xuân yêu thương. Các tiết
                mục do chính học sinh biên tập và thể hiện, từ múa, hát, nhạc kịch đến biểu diễn nhạc cụ dân tộc và hiện đại.
              </p>
            </BoxContentAndImg>

            <BoxContentAndImg
              isSwiper
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1752898322/485822269_1122180993046757_2924633607541318652_n.jpg_ufydea.jpg"
              isLeftImgBg
              listImg={imgActivity.imgStudentCampings}
            >
              <h3 className="mb-6">Hội trại truyền thống</h3>
              <p className={cx("text-img")}>
                Tuy không diễn ra thường niên, nhưng mỗi kỳ hội trại tại Trường THPT Duy Tân luôn để lại dấu ấn sâu đậm trong lòng học sinh.
                Được tổ chức vào những dịp đặc biệt như kỷ niệm thành lập trường, Ngày Thành lập Đoàn 26/3 hoặc các sự kiện trọng đại, hội
                trại là cơ hội để học sinh được hòa mình vào không khí sôi động với các hoạt động: dựng trại theo chủ đề, trò chơi dân gian,
                nét đẹp doàn viên và đêm lửa trại đầy cảm xúc.
              </p>
            </BoxContentAndImg>

            <BoxContentAndImg
              isSwiper
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1752897977/483103651_1113421323922724_4627461808748182634_n.jpg_pk9kyg.jpg"
              listImg={imgActivity.imgStudentActivitys}
            >
              <h3 className="mb-6">Những hoạt động khác</h3>
              <p className={cx("text-img")}>
                Ngoài văn nghệ và hội trại, Trường THPT Duy Tân còn tổ chức nhiều hoạt động ngoại khóa đa dạng nhằm phát triển kỹ năng mềm
                và nuôi dưỡng tinh thần trách nhiệm trong học sinh. Các chương trình tiêu biểu có thể kể đến như: các câu lạc bộ học thuật –
                thể thao, cuộc thi hùng biện, sáng tạo khoa học, các buổi sinh hoạt chuyên đề kỹ năng sống, và các chương trình thiện nguyện
                vì cộng đồng.
              </p>
            </BoxContentAndImg>
          </div>
          <TrophiContainer listImg={imgActivity.studentAchievements} />
          <SchoolStats />
          <SchoolMap />
          <div className={cx("box-content-5")}>
            <div className={cx("container")}>
              <div className={cx("content", "mb-4")}>
                <h3 className={cx("text-center", "mb-4 fs-1 fw-bolder")}>Cuối cùng</h3>
                <p className="fs-2">
                  Với những nỗ lực không ngừng trong việc nâng cao chất lượng giáo dục và phát triển toàn diện cho học sinh, Trường THPT Duy
                  Tân đã trở thành một trong những trường THPT có uy tín.
                </p>
              </div>
              <p className="mb-4">Tìm hiểu thêm về trường học tại:</p>
              <div className={cx("list_link", "mb-4")}>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="http://thptduytan.edu.vn/index.php/trang-ch/gii-thiu-v-trng"
                >
                  Giới thiệu trường học
                </a>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="http://thptduytan.edu.vn/index.php/tin-tc/bn-tin-trng/766-l-b-ging-nm-hc-2024-2025"
                >
                  Lễ bế giảng năm học 2024-2025
                </a>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="http://thptduytan.edu.vn/index.php/tin-tc/bn-tin-trng">
                  Bản tin trường
                </a>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="http://thptduytan.edu.vn/ooffice/sachthuvien/">
                  Tra cứu sách thư viện
                </a>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="http://thptduytan.edu.vn/index.php/c-cu-t-chc/ban-giam-hiu"
                >
                  Ban giám hiệu
                </a>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="https://clevai.edu.vn/hieu-con-yeu/danh-gia-truong-thpt-duy-tan-quang-nam-co-tot-khong/"
                >
                  Duy Tân có tốt không?
                </a>
              </div>
              <p className="mb-4">Các thông tin liên quan:</p>
              <div className={cx("list_link")}>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="http://thptduytan.edu.vn">
                  Website Trường THPT Duy Tân
                </a>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="https://www.facebook.com/duytantk">
                  Fanpage Trường THPT Duy Tân
                </a>
                <a className={cx("btn-sm")} href="tel:02353841942">
                  Hotline: 0235.3841.942
                </a>
              </div>
            </div>
          </div>
        </div>
      </Pc>

      <Desktop>
        <div className={cx("wrapper", "desktop")}>
          {isLoading && <Loading />}
          <div className={cx("content-1")}>
            <BoxContentAndImg
              imgUrl="https://res.cloudinary.com/dwoymvppw/image/upload/v1752892084/phoca_thumb_l_img_0188_ucfe6j.jpg"
              desImg="Trường học giai đoạn đầu"
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1752893673/73141113_730983574035387_2818179285607514112_n.jpg_plvcef.jpg"
              imgWidth="35pc"
            >
              <h3 className="mb-6">Thông tin trường học</h3>
              <p className={cx("text-img")}>
                Trường Trung học phổ thông (THPT) Duy Tân là một cơ sở giáo dục công lập tọa lạc tại Phường Quảng Phú, TP. Đà Nẵng. Được
                thành lập vào năm 2010 theo Quyết định số 1119/QĐ-UBND của UBND tỉnh Quảng Nam (cũ), trường nhằm tạo điều kiện thuận lợi cho
                việc học tập của học sinh tại các xã phường như: Phường Quảng Phú, phường Tam Kỳ, phường Hương Trà, phường Bàn Thạch, xã
                Thăng Trường, xã Tam Xuân.
              </p>
            </BoxContentAndImg>
          </div>

          <div className={cx("content-2")}>
            <Container>
              <p>
                Trong những năm đầu hoạt động, trường chưa có cơ sở riêng và phải mượn cơ sở cũ của Trường THCS Lý Thường Kiệt tại thôn Phú
                Thạnh, xã Tam Phú (cũ) để tổ chức dạy học. Đến tháng 8 năm 2016, trường mới chuyển về cơ sở mới tại thôn Ngọc Mỹ, xã Tam Phú
                (cũ).
              </p>
            </Container>
            <SwiperImg data={imgActivity.imgSchool} width="800px" />
          </div>

          <MainContentSchool />

          <div className={cx("content-4")}>
            <Container>
              <div className={cx("main-content")}>
                <h4>Hoạt động dành cho học sinh</h4>
                <p>
                  Bên cạnh việc học tập, Trường THPT Duy Tân luôn chú trọng phát triển toàn diện cho học sinh thông qua nhiều hoạt động
                  ngoại khóa phong phú như: hội trại truyền thống, câu lạc bộ học thuật, thể thao, văn nghệ và các chương trình thiện nguyện
                  ý nghĩa. Những sân chơi này không chỉ giúp học sinh thư giãn mà còn rèn luyện kỹ năng sống, tinh thần đồng đội và sự tự
                  tin.
                </p>
                <p>Dưới đây là một số hình ảnh tiêu biểu ghi lại khoảnh khắc đáng nhớ trong các hoạt động tại trường:</p>
              </div>
            </Container>

            <BoxContentAndImg
              isSwiper
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1749179561/BE_GIANG_DT_22_lhjusl.jpg"
              listImg={imgActivity.imgStudentDancings}
            >
              <h3 className="mb-6">Nghệ thuật</h3>
              <p className={cx("text-img")}>
                Hoạt động văn nghệ là điểm nhấn nổi bật trong đời sống học đường tại Trường THPT Duy Tân. Hàng năm, nhà trường tổ chức nhiều
                chương trình biểu diễn như Hội diễn chào mừng năm học mới, Văn nghệ tri ân thầy cô 20/11, và Tết xuân yêu thương. Các tiết
                mục do chính học sinh biên tập và thể hiện, từ múa, hát, nhạc kịch đến biểu diễn nhạc cụ dân tộc và hiện đại.
              </p>
            </BoxContentAndImg>

            <BoxContentAndImg
              isSwiper
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1752898322/485822269_1122180993046757_2924633607541318652_n.jpg_ufydea.jpg"
              isLeftImgBg
              listImg={imgActivity.imgStudentCampings}
            >
              <h3 className="mb-6">Hội trại truyền thống</h3>
              <p className={cx("text-img")}>
                Tuy không diễn ra thường niên, nhưng mỗi kỳ hội trại tại Trường THPT Duy Tân luôn để lại dấu ấn sâu đậm trong lòng học sinh.
                Được tổ chức vào những dịp đặc biệt như kỷ niệm thành lập trường, Ngày Thành lập Đoàn 26/3 hoặc các sự kiện trọng đại, hội
                trại là cơ hội để học sinh được hòa mình vào không khí sôi động với các hoạt động: dựng trại theo chủ đề, trò chơi dân gian,
                nét đẹp doàn viên và đêm lửa trại đầy cảm xúc.
              </p>
            </BoxContentAndImg>

            <BoxContentAndImg
              isSwiper
              backGround="https://res.cloudinary.com/dwoymvppw/image/upload/v1752897977/483103651_1113421323922724_4627461808748182634_n.jpg_pk9kyg.jpg"
              listImg={imgActivity.imgStudentActivitys}
            >
              <h3 className="mb-6">Những hoạt động khác</h3>
              <p className={cx("text-img")}>
                Ngoài văn nghệ và hội trại, Trường THPT Duy Tân còn tổ chức nhiều hoạt động ngoại khóa đa dạng nhằm phát triển kỹ năng mềm
                và nuôi dưỡng tinh thần trách nhiệm trong học sinh. Các chương trình tiêu biểu có thể kể đến như: các câu lạc bộ học thuật –
                thể thao, cuộc thi hùng biện, sáng tạo khoa học, các buổi sinh hoạt chuyên đề kỹ năng sống, và các chương trình thiện nguyện
                vì cộng đồng.
              </p>
            </BoxContentAndImg>
          </div>
          <TrophiContainer listImg={imgActivity.studentAchievements} />
          <SchoolStats />
          <SchoolMap />
          <div className={cx("box-content-5")}>
            <div className={cx("container")}>
              <div className={cx("content")}>
                <h3 className={cx("text-center")}>Cuối cùng</h3>
                <p>
                  Với những nỗ lực không ngừng trong việc nâng cao chất lượng giáo dục và phát triển toàn diện cho học sinh, Trường THPT Duy
                  Tân đã trở thành một trong những trường THPT có uy tín.
                </p>
              </div>
              <p>Tìm hiểu thêm về trường học tại:</p>
              <div className={cx("list_link", "mb-4")}>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="http://thptduytan.edu.vn/index.php/trang-ch/gii-thiu-v-trng"
                >
                  Giới thiệu trường học
                </a>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="http://thptduytan.edu.vn/index.php/tin-tc/bn-tin-trng/766-l-b-ging-nm-hc-2024-2025"
                >
                  Lễ bế giảng năm học 2024-2025
                </a>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="http://thptduytan.edu.vn/index.php/tin-tc/bn-tin-trng">
                  Bản tin trường
                </a>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="http://thptduytan.edu.vn/ooffice/sachthuvien/">
                  Tra cứu sách thư viện
                </a>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="http://thptduytan.edu.vn/index.php/c-cu-t-chc/ban-giam-hiu"
                >
                  Ban giám hiệu
                </a>
                <a
                  className={cx("btn-sm")}
                  target="_blank"
                  rel="noreferrer"
                  href="https://clevai.edu.vn/hieu-con-yeu/danh-gia-truong-thpt-duy-tan-quang-nam-co-tot-khong/"
                >
                  Duy Tân có tốt không?
                </a>
              </div>
              <p>Các thông tin liên quan:</p>
              <div className={cx("list_link")}>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="http://thptduytan.edu.vn">
                  Website Trường THPT Duy Tân
                </a>
                <a className={cx("btn-sm")} target="_blank" rel="noreferrer" href="https://www.facebook.com/duytantk">
                  Fanpage Trường THPT Duy Tân
                </a>
                <a className={cx("btn-sm")} href="tel:02353841942">
                  Hotline: 0235.3841.942
                </a>
              </div>
            </div>
          </div>
        </div>
      </Desktop>
    </>
  );
}

export default School;
