import { CombinationChart, CombinationDetail, RegisterCombination } from "../Pages/Combination";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import School from "../Pages/School";
import User from "../Pages/Profile/Main";
import EditProfile from "../Pages/Profile/EditProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBook,
  faBookmark,
  faBuilding,
  faChartSimple,
  faContactBook,
  faFileCircleCheck,
  faFolder,
  faHome,
  faUserPen
} from "@fortawesome/free-solid-svg-icons";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";
import MainNoti from "../Pages/Noti/MainNoti";
import NotiDetail from "../Pages/Noti/NotiDetail";
import CombinationList from "../Pages/Combination/CombinationList";
import CombinationListFavour from "../Pages/Combination/CombinationListFavour";
import TablePage from "../Pages/Table";
import GeneratorNoti from "../Pages/Noti/GeneratorNoti";
import NotiEdit from "../Pages/Noti/NotiEdit";
import NotiInfo from "../Pages/Noti/NotiInfo";
import Students from "../Pages/ClassDivide/Students";
import Classmate from "../Pages/ClassDivide/Classmate";
import ClassDetail from "../Pages/ClassDivide/ClassDetail";
import SchoolLayout from "../Components/layouts/SchoolLayout";
import HomeLayout from "../Components/layouts/HomeLayout";
import CombinationStat from "../Pages/Combination/CombinationStat";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    title: "Trang Chủ",
    icon: <FontAwesomeIcon className="" icon={faHome} />,
    layout: HomeLayout,
    roles: ["student", "manager"],
    inSidebar: false
  },
  {
    path: "/auth/signin",
    component: Signin,
    layout: null,
    roles: ["student", "manager"],
    inSidebar: false
  },
  {
    path: "/auth/signup",
    component: Signup,
    layout: null,
    roles: ["student", "manager"],
    inSidebar: false
  }
];

const privateRoutes = [
  {
    path: "/combination/register",
    component: RegisterCombination,
    title: "Đăng Ký Tổ Hợp",
    icon: <FontAwesomeIcon className="" icon={faUserPen} />,
    roles: ["student"]
  },
  {
    path: "/combination/submitted/list",
    component: CombinationList,
    title: "Danh Dách Đăng Ký",
    icon: <FontAwesomeIcon className="" icon={faFolder} />,
    roles: ["manager"]
  },
  {
    path: "/combination/submitted/favour",
    component: CombinationListFavour,
    title: "Danh Dách Đã Lưu",
    icon: <FontAwesomeIcon className="" icon={faBookmark} />,
    roles: ["manager"]
  },
  {
    path: "/school",
    component: School,
    title: "Trường Học",
    icon: <FontAwesomeIcon className="" icon={faBuilding} />,
    roles: ["student"],
    layout: SchoolLayout
  },
  {
    path: "/contact",
    component: Contact,
    title: "Liên Hệ",
    icon: <FontAwesomeIcon className="" icon={faContactBook} />,
    roles: ["student"]
  },
  {
    path: "/combination/chart",
    component: CombinationChart,
    title: "Thống Kê",
    icon: <FontAwesomeIcon className="" icon={faChartSimple} />,
    roles: ["student"]
  },
  {
    path: "/combination/stat",
    component: CombinationStat,
    title: "Thống Kê",
    icon: <FontAwesomeIcon className="" icon={faChartSimple} />,
    roles: ["manager"]
  },
  {
    path: "/combination/detail",
    component: CombinationDetail,
    title: "Hồ Sơ Đã Nộp",
    icon: <FontAwesomeIcon className="" icon={faFileCircleCheck} />,
    roles: ["student"]
  },
  {
    path: "/combination/detail/:id",
    component: CombinationDetail,
    title: "Hồ Sơ Đã Nộp",
    inSidebar: false,
    roles: ["manager"]
  },
  {
    path: "/table",
    component: TablePage,
    title: "Tổ hợp",
    icon: <FontAwesomeIcon className="" icon={faBook} />,
    roles: ["manager"]
  },
  {
    path: "/notifications",
    component: MainNoti,
    title: "Danh sách thông báo",
    icon: <FontAwesomeIcon className="" icon={faBell} />,
    roles: ["student", "manager"]
  },
  {
    path: "/notification/generator",
    component: GeneratorNoti,
    inSidebar: false,
    roles: ["manager"]
  },
  {
    path: "/notification/info",
    component: NotiInfo,
    inSidebar: false,
    roles: ["manager"]
  },
  {
    path: "/notifications/:id",
    component: NotiDetail,
    inSidebar: false,
    roles: ["student", "manager"]
  },
  {
    path: "/notifications/edit/:id",
    component: NotiEdit,
    inSidebar: false,
    roles: ["manager"]
  },
  { path: "/profile", component: User, inSidebar: false, roles: ["student", "manager"] },
  { path: "/profile/edit", component: EditProfile, inSidebar: false, roles: ["student", "manager"] },
  {
    path: "/ad/classmate",
    component: Classmate,
    inSidebar: false,
    layout: HomeLayout,
    roles: ["manager"]
  },
  {
    path: "/ad/students",
    component: Students,
    inSidebar: false,
    layout: HomeLayout,
    roles: ["manager"]
  },
  {
    path: "/ad/class/:id",
    component: ClassDetail,
    inSidebar: false,
    layout: HomeLayout,
    roles: ["manager"]
  }
];

export { publicRoutes, privateRoutes };
