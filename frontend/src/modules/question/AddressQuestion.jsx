import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import DaumPostCode from "react-daum-postcode";
import "../../styles/Question.css";
import "../../styles/AddressQuestion.css";
function AddressQuestion({ config }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [required] = useState(config.required);

  const [address, setAddress] = useState({
    addr: "",
    extra_addr: "",
    code: "",
  });
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

    setAddress({
      addr: addr,
      extra_addr: extraAddr,
      code: data.zonecode,
    });
    setShowPostCode(false);
  };
  const onPostCodeClicked = () => {
    setShowPostCode(true);
  };
  const onPostResetClicked = () => {
    setShowPostCode(false);
    setAddress({
      addr: "",
      extra_addr: "",
      code: "",
    });
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      <div className="code-line">
        <div className="code-input">
          <Input placeholder="우편번호" readOnly={true} value={address.code} />
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
        <div className="addr-input">
          <Input placeholder="주소" readOnly={true} value={address.addr} />
        </div>
        <div className="extra-addr-input">
          <Input
            placeholder="상세주소"
            readOnly={true}
            value={address.extra_addr}
          />
        </div>
      </div>
      <Input className="detail-addr-input" placeholder="직접입력" />
    </div>
  );
}

AddressQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
  }),
};

export default AddressQuestion;
