import { useEffect, useState } from "react";
import BoxRadius from "../../../Components/BoxRadius";
import StartCard from "../CombinationChart/StartCard";
import ColumnStat from "./ColumnStat";
import CommentGender from "./CommentGender";
import Progress from "./Progress";
import TitleChart from "./TitleChart";
import axios from "axios";
import CombinationChosen from "../CombinationChart/CombinationChosen";
import { useNavigate } from "react-router-dom";

function CombinationStat() {
    const [dataChart, setDataChart] = useState({});
    const navigator = useNavigate();

    useEffect(() => {
        document.title = "Đăng ký tổ hợp | Thống kê";
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4001/combination/analytics").then((axiosData) => {
        if (axiosData.data.isSuccess) {
            setDataChart(axiosData.data);
        } else {
            navigator("/auth/signin");
        }
        });
    }, [navigator]);
    return ( 
        <BoxRadius>
            <h1 className="fw-bold mb-10" style={{fontSize: '32px'}}>Thống kê Tuyển sinh 2025</h1>
            <div className="flex justify-center flex-col">
                <TitleChart title={'Thông Tin Chung'}/>
                <div className="flex gap-8 mb-24">
                    <StartCard value={1200} title="Tổng hồ sơ nộp" color="bg-blue-500" subText={`+36 hồ sơ hôm nay`} icon={<svg className="w-18 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}/>
                    <StartCard value={500} title="Chỉ tiêu tuyển sinh" color="bg-purple-500" subText={`240% so với chỉ tiêu`} icon={<svg className="w-18 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}/>
                    <StartCard value={180} title="Tổng hồ sơ nộp" color="bg-emerald-500" subText={`36% chỉ tiêu đã đạt`} icon={<svg className="w-18 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}/>
                    <StartCard value={240} title="Tổng hồ sơ nộp" color="bg-orange-400" subText={`Cần xem xét ngay`} icon={<svg className="w-18 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}/>
                </div>
                <TitleChart title={'Thống Kê Tỉ Lệ'}/>
                <div className="flex gap-8 mb-24">
                    <div className="flex gap-8 w-1/2">
                        <div className="rounded-xl bg-white shadow-sm border p-6 border-gray-50 flex flex-col justify-center h-100 w-max">
                            <h1 className="fs-2 mb-4 fw-bold">Hành vi Nộp hồ sơ</h1>
                            <div className="flex items-center">
                                <div className="rounded-full position-relative size-56 flex justify-center items-center hover:scale-110 cursor-pointer transition-transform" style={{ background: 'conic-gradient(#10b981 0% 55%, #f59e0b 55% 100%)' }}>
                                    <div className="size-36 fw-bold bg-white rounded-full flex flex-col justify-center items-center">
                                    <span className="fs-2">1250</span>
                                        <span className="fs-6 text-gray-400">tổng hồ sơ</span>
                                    </div>
                                </div>
                                <div className="flex flex-col ms-4 gap-4 w-max">
                                    <Progress title={'Đã chỉnh sửa'} subText={'Chỉnh sửa tỉ mỉ, đúng đắn.'} value={850} max={1250} color={'#10b981'}/>
                                    <Progress title={'Chưa chỉnh sửa'} subText={'Nộp ngay lần đầu'} value={400} max={1250} color={'#f59e0b'}/>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white shadow-sm border p-6 border-gray-50 flex flex-col justify-center h-100 w-max">
                            <h1 className="fs-2 mb-4 fw-bold">Tỷ lệ Giới tính</h1>
                            <div className="flex flex-col items-center justify-center gap-10 w-100">
                                <div className="rounded-full position-relative size-56 flex justify-center items-center text-p hover:rotate-6 cursor-pointer transition-transform" style={{background: 'conic-gradient(#3b82f6 0% 55%, #ec4899 55% 100%)' }}>
                                    <div className="size-36 bg-white rounded-full fw-bold flex flex-col justify-center items-center">
                                        <span className="fs-2">1250</span>
                                        <span className="fs-6 text-gray-400">tổng hồ sơ</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CommentGender title={'Nam (55%)'} color={"#3b82f6"}/>
                                    <CommentGender title={'Nữ (45%)'} color={"#ec4899"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white shadow-sm border p-6 border-gray-50 w-100">
                        <h1 className="fs-2 mb-4 fw-bold">Thống kê các trường</h1>
                        <div className="flex flex-col gap-3">
                            <Progress title={'THCS Nguyễn Huệ'} max={1250} value={175} color={'#fb923c'}/>
                            <Progress title={'THCS Nguyễn Huệ'} max={1250} value={375} color={'#fb923c'}/>
                            <Progress title={'THCS Nguyễn Huệ'} max={1250} value={15} color={'#fb923c'}/>
                            <Progress title={'THCS Nguyễn Huệ'} max={1250} value={75} color={'#fb923c'}/>
                            <Progress title={'Khác'} max={1250} value={304} color={'#fb923c'}/>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white shadow-sm border p-6 border-gray-50 w-100">
                        <div className="flex justify-between items-center">
                            <h1 className="fs-2 mb-4 fw-bold">Thống kê điểm 3 môn</h1>
                            <span className="bg-indigo-200 text-indigo-600 rounded-lg fw-bold p-3 fs-4" title="Trung bình: 20.1">TB: 20.1</span>
                        </div>
                        <div className="flex gap-2 h-4/5">
                            <ColumnStat value={30} max={80} title="< 15"/>
                            <ColumnStat value={80} max={80} title="15-18"/>
                            <ColumnStat value={50} max={80} title="18-21"/>
                            <ColumnStat value={30} max={80} title="21-24"/>
                            <ColumnStat value={35} max={80} title="24-27"/>
                            <ColumnStat value={35} max={80} title="> 27"/>
                        </div>
                    </div>
                </div>
                <TitleChart title={'Thống Kê Tổ Hợp'}/>
                <CombinationChosen
                    show
                    labels={dataChart.combinations}
                    dataCombination1={dataChart.countCombinaton1}
                    dataCombination2={dataChart.countCombinaton2}
                    mostChooseOfCombination1={dataChart.mostChooseOfCombination1}
                    mostChooseOfCombination2={dataChart.mostChooseOfCombination2}
                />
            </div>
        </BoxRadius>
     );
}

export default CombinationStat;