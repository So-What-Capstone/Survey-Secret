import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import DaumPostCode from "react-daum-postcode";
import "../../styles/Question.css";
import "../../styles/AddressQuestion.css";
function AddressQuestion({ title, disc, required }) {
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
      <div className="question-title"> {title} </div>
      <div className="question-discription"> {disc} </div>
      <div className="code-line">
        <Input
          className="code-input"
          placeholder="우편번호"
          readOnly={true}
          value={address.code}
        />
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
        <Input
          className="addr-input"
          placeholder="주소"
          readOnly={true}
          value={address.addr}
        />
        <Input
          className="extra-addr-input"
          placeholder="상세주소"
          readOnly={true}
          value={address.extra_addr}
        />
      </div>
      <Input className="detail-addr-input" placeholder="직접입력" />
    </div>
  );
}

AddressQuestion.propTypes = {
  title: PropTypes.string,
  disc: PropTypes.string,
  isLong: PropTypes.bool,
  required: PropTypes.bool,
};

export default AddressQuestion;
