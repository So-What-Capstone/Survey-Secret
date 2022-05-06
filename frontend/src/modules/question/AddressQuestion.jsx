import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import DaumPostCode from "react-daum-postcode";
import "../../styles/Question.css";
import "../../styles/AddressQuestion.css";

function AddressQuestion({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [required] = useState(config.required);
  useEffect((e) => {
    setValue({ ...value, isValid: !required });
  }, []);
  const [show_postcode, setShowPostCode] = useState(false);
  const onComplete = (data) => {
    var addr = "";
    var extraAddr = "";
    if (data.userSelectedType === "R") addr = data.roadAddress;
    else addr = data.jibunAddress;
    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddr !== "") {
        extraAddr = " (" + extraAddr + ")";
      }
    }
    let isValid = required ? Boolean(data.zonecode) : true;
    setValue({
      zip_code: data.zonecode,
      address: addr,
      address_detail: extraAddr,
      isValid: isValid,
    });
    setShowPostCode(false);
  };
  const onPostCodeClicked = () => {
    setShowPostCode(true);
  };
  const onPostResetClicked = () => {
    setShowPostCode(false);
    setValue({
      zip_code: "",
      address: "",
      address_detail: "",
      isValid: !required,
    });
  };
  const onAddrDetailChanged = (e) => {
    setValue({
      ...value,
      address_detail: e.target.value,
    });
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      <div className="code-line">
        <div className="code-input">
          <Input
            placeholder="우편번호"
            readOnly={true}
            value={value.zip_code}
          />
        </div>

        <Button
          className="code-button"
          onClick={onPostCodeClicked}
          type="primary"
        >
          우편번호찾기
        </Button>
        <Button
          className="code-button"
          onClick={onPostResetClicked}
          type="secondary"
        >
          우편번호 초기화
        </Button>
      </div>
      <div className="post-code">
        {show_postcode ? <DaumPostCode onComplete={onComplete} /> : null}
      </div>
      <div className="address-line">
        <Input placeholder="주소" readOnly={true} value={value.address} />
      </div>
      <Input
        placeholder="상세주소 (직접입력)"
        value={value.address_detail}
        onChange={onAddrDetailChanged}
      />
    </div>
  );
}

AddressQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
  }),
  value: PropTypes.shape({
    zip_code: PropTypes.string,
    address: PropTypes.string,
    address_detail: PropTypes.string,
    isValid: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

export default AddressQuestion;
