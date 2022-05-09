import React, { useRef, useState } from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/Respond.css";

function Respond() {
  const [response, setResponse] = useState();
  const onSubmitClick = () => {
    // submit the response
    console.log(response);
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
