import React, { useRef, useState } from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/Respond.css";

function Respond() {
  const [response, setResponse] = useState();
  const onSubmitClick = () => {
    // submit the response
    let isValid = true;
    for (const idx in response) {
      if (!response[idx].isValid) {
        isValid = false;
        break;
      }
    }

    console.log(response);
    if (isValid) {
      alert("제출되었습니다.");
    } else {
      alert("필수 응답문항을 모두 답해주세요.");
    }
  };
  return (
    <div className="respond-container">
      respond~~
      <div className="preview">
        <Form
          _config={template_list[2]}
          // _response={response}
          _setResponse={setResponse}
        />
        <div className="respond-submit-container">
          <button className="respond-submit-btn" onClick={onSubmitClick}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Respond;
