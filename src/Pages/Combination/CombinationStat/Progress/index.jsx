function Progress({ title, subText, value, max, color, height = "4", hover = "Hồ sơ" }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="fs-3 fw-medium me-10">{title}</span>
        <span className="fw-bold" title={value + " " + hover} style={{ color: color }}>
          {value}({((value / max) * 100).toFixed(0)}%)
        </span>
      </div>
      <div className={`w-full h-${height} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          title={value + " - " + `${((value / max) * 100).toFixed(0)}%`}
          className={`h-${height} hover:opacity-60 transition-opacity cursor-pointer`}
          style={{ width: `${((value / max) * 100).toFixed(0)}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="fs-4 text-gray-500">{subText}</span>
    </div>
  );
}

export default Progress;
