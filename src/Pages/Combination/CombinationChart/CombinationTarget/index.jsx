import ColumnStat from "../../CombinationStat/ColumnStat";

function CombinationTarget({ show = true, labels = [], chosen = [], empty = [] }) {
  return (
    <div style={{ display: show ? "block" : "none" }}>
      <h3 className="text-center fw-bold fs-1 mb-4">Biểu đồ thống kê số lượng học sinh đăng ký so với chỉ tiêu</h3>
      <div className="flex flex-col justify-center items-center">
        <div className="flex rounded-xl bg-white shadow-sm border w-1/2 p-6 border-gray-50 h-96">
          <div className="flex h-4/5 gap-3 w-100">
            {chosen && chosen.map((item, index) => <ColumnStat value={item} max={item + empty[index]} title={labels[index]} bg="gray" />)}
          </div>
        </div>
        <p className="mt-4 w-4/5">
          Biểu đồ thống kê số học sinh đăng ký vào từng tổ hợp so với số lượng chỉ tiêu tối đa được phân bổ cho mỗi tổ hợp. Thông tin giúp
          đánh giá mức độ quan tâm và phân bố nguyện vọng của học sinh.
        </p>
      </div>
    </div>
  );
}

export default CombinationTarget;
