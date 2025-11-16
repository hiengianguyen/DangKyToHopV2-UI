import classNames from "classnames/bind";
import style from "./Contact.module.scss";
import BoxRadius from "../../Components/BoxRadius";
import { useEffect } from "react";
import BtnSrcollTop from "../../Components/BtnScrollTop";

const cx = classNames.bind(style);

function Contact() {
  useEffect(() => {
    document.title = "Đăng ký tổ hợp | Liên hệ";
  }, []);
  return (
    <BoxRadius>
      <div className={cx("wrapper")}>
        <h4 className="text-center fw-bolder text-gray-800 fs-2">Thông tin Ban tuyển sinh trường THPT Duy Tân</h4>
        <p className="my-4 text-justify px-10 fw-medium">
          Ban tuyển sinh của trường có nhiệm vụ tổ chức, quản lý và giám sát toàn bộ quá trình tuyển sinh. Các thành viên trong ban chịu
          trách nhiệm tiếp nhận hồ sơ, kiểm tra thông tin, tư vấn cho học sinh – phụ huynh, đồng thời đảm bảo việc xét tuyển và phân lớp
          diễn ra công bằng, minh bạch, đúng quy định của nhà trường và cơ quan giáo dục.
        </p>
        <div className={cx("contact-teacher")}>
          <ul class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            <li>
              <div class="flex items-center gap-x-6">
                <img
                  src="https://res.cloudinary.com/dwoymvppw/image/upload/v1743848084/default_user_avatar_dckymx.avif"
                  alt=""
                  class="w-32 rounded-full outline-1 -outline-offset-1 outline-white/10"
                />
                <div>
                  <h3 class="text-base/7 fs-2 mb-2 font-semibold tracking-tight text-blue-900">Phan Thị Tuyết Nhung</h3>
                  <p class="fs-4 font-semibold text-blue-600">Trưởng ban tuyển sinh</p>
                  <p class="fs-4 font-semibold text-blue-400">Email: phantuyennhung20@gmail.com</p>
                  <p class="fs-4 font-semibold text-blue-400">SĐT: 0144354565</p>
                </div>
              </div>
            </li>
            <li>
              <div class="flex items-center gap-x-6">
                <img
                  src="https://res.cloudinary.com/dwoymvppw/image/upload/v1743848084/default_user_avatar_dckymx.avif"
                  alt=""
                  class="w-32 rounded-full outline-1 -outline-offset-1 outline-white/10"
                />
                <div>
                  <h3 class="text-base/7 fs-2 mb-2 font-semibold tracking-tight text-blue-900">Bùi Kim Hà</h3>
                  <p class="fs-4 font-semibold text-blue-700">Phó ban tuyển sinh</p>
                  <p class="fs-5 font-semibold text-blue-400">Email: buikimha20@gmail.com</p>
                  <p class="fs-5 font-semibold text-blue-400">SĐT: 0144354565</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <BtnSrcollTop />
    </BoxRadius>
  );
}

export default Contact;
