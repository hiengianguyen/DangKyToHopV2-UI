import classNames from "classnames/bind";
import style from "./InputHadValue.module.scss";

const cx = classNames.bind(style);

function InputHadValue({ label = "", value = "", fontStyle = "", flexColumn=true }) {
  return (
    <div className={cx("wrapper", flexColumn ? "flex-col" : "items-center")}>
      <span>{label}:</span>
      <span className={cx("value-text", "border-b border-gray-200")} style={{ textTransform: fontStyle === "" ? "capitalize" : "" }}>
        {value}
      </span>
    </div>
  );
}

export default InputHadValue;
