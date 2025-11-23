import classNames from "classnames/bind";
import style from "./Select.module.scss";
import Form from "react-bootstrap/Form";

const cx = classNames.bind(style);

function Select({
  label = "",
  name = "",
  valueNoti = "Chọn giá trị",
  opts = [],
  onChange = () => {},
  selected = "",
  errorValue = false,
  noLabel = false
}) {
  return (
    <Form.Group className={cx("wrapper", { invalid: errorValue })}>
      {!noLabel && <Form.Label as="span">{label}:</Form.Label>}
      <Form.Control as="select" name={name} defaultValue={selected} onChange={onChange} className="border border-gray-300" required>
        <option selected={selected === ""} value="">
          -- {valueNoti} --
        </option>
        {opts.map((item, index) => (
          <option key={index} selected={item.value === selected} value={item.value}>
            {item.title}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default Select;
