import React, { useState, useEffect } from "react";
import ClipTray from "../modules/ClipTray";
import ContactList from "../modules/ContactList";
import { gql, useQuery, useMutation } from "@apollo/client";
import { getMyFormsForContactQuery } from "../API/meQuery";
import { sendSms } from "../API/sendQuery";
import { tokenVar, verifyToken, logUserOut } from "./../apollo";
import { useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "../styles/Clips.css";
import "../styles/Message.scss";
import "../styles/Main.scss";

const GET_MY_FORMS_CONTACT_QUERY = getMyFormsForContactQuery;
const SEND_SMS = sendSms;

function Message() {
  const clips = [
    { title: "문자 서비스", link_enabled: false, link: ".", color_idx: 0 },
  ];

  const [myForms, setMyForms] = useState([
    {
      id: "",
      title: "",
    },
  ]);

  const navigate = useNavigate();

  const token = useReactiveVar(tokenVar);

  useEffect(() => {
    if (!token || !verifyToken()) {
      alert("로그인 후 이용해 주세요.");
      logUserOut(false);
      navigate("/login");
    }
  }, []);

  //대표질문 내용
  const [repsQuestionContent, setRepsQuestionContent] = useState("");

  //개인정보질문 id
  const [phoneQueId, setPhoneQueId] = useState("");
  const [emailQueId, setEmailQueId] = useState("");

  //SMS, LMS
  const [smsType, setSmsType] = useState("SMS");

  /* 수신인 정보 */
  const [selectedForm, setSelectedForm] = useState({
    id: "",
    title: "",
    receivers: [],
  });

  //선택된 설문
  const [checkedItems, setCheckedItems] = useState(new Set()); //체크된 수신자들(receiverId들의 배열)

  /* 문자메시지 발신 정보 */
  const [textValue, setTextValue] = useState("");
  const [textByte, setTextByte] = useState(0);

  const maxByte = 100; //최대 100바이트

  const { data, loading, error } = useQuery(GET_MY_FORMS_CONTACT_QUERY, {
    onCompleted: (data) => {
      const myFormList = data?.me?.user?.forms.map((form) => {
        const obj = {};
        obj["id"] = form._id;
        obj["title"] = form.title;
        return obj;
      });
      setMyForms(myFormList);
      //setSelectedForm
    },
  });

  const handleTextValue = (e) => {
    setTextValue(e.target.value);
    checkByte(e.target.value);
  };

  const [sendSms] = useMutation(SEND_SMS, {
    onCompleted: (data) => {
      if (data.sendSms.ok) {
        alert("전송하였습니다.");
      } else {
        alert("전송 실패하였습니다.");
        throw new Error(data.sendSms.error);
      }
    },
  });

  const sendMessage = async () => {
    if (textByte < 1) {
      alert("내용을 입력하세요.");
    } else {
      //console.log("selectedForm Id: " + selectedForm.id);
      checkedItems.forEach(function (value) {
        //console.log("receiverId: " + value);
      });
      //console.log("개인정보질문id + " + phoneQueId);
      const checkedItemsArray = Array.from(checkedItems); //set to array

      if (phoneQueId !== "") {
        await sendSms({
          variables: {
            formId: selectedForm.id,
            submissionIds: checkedItemsArray,
            questionId: phoneQueId,
            msg: textValue,
            msgType: smsType,
          },
        });
      } else {
        alert("연락 정보가 없어 전송할 수 없습니다.");
      }
    }
  };

  const checkByte = (newTextValue) => {
    let totalByte = 0; //현재 바이트
    const totalLen = newTextValue.length; //현재 글자수
    let lastByte = 0; //마지막 바이트(바이트 초과시 지우기 위함)

    for (let i = 0; i < totalLen; i++) {
      const eachChar = newTextValue.charAt(i);
      const uniChar = escape(eachChar); //유니코드 형식으로 변환
      if (uniChar.length > 4) {
        //한글 : 2Byte
        totalByte += 2;
        if (i === totalLen - 1) {
          lastByte = 2;
        }
      } else {
        //영문, 숫자, 특수문자, 공백 : 1Byte
        totalByte += 1;
        if (i === totalLen - 1) {
          lastByte = 1;
        }
      }
    }

    if (totalByte > maxByte) {
      setSmsType("LMS");
    } else {
      setSmsType("SMS");
    }

    setTextByte(totalByte);
  };

  return (
    <div>
      <ClipTray clips={clips} />
      <div className="message-con">
        <ContactList
          forms={myForms}
          selectedForm={selectedForm}
          repsQuestionContent={repsQuestionContent}
          phoneQueId={phoneQueId}
          setPhoneQueId={setPhoneQueId}
          emailQueId={emailQueId}
          setEmailQueId={setEmailQueId}
          setRepsQuestionContent={setRepsQuestionContent}
          checkedItems={checkedItems}
          setSelectedForm={setSelectedForm}
          setCheckedItems={setCheckedItems}
        />
        <div className="detail-panel">
          <div className="content-row">
            <div className="content-label">
              <label>문자 내용 입력</label>
              <span></span>
              {smsType === "LMS" && <label>LMS</label>}
              {smsType === "SMS" && (
                <label>
                  {textByte}/{maxByte}Byte
                </label>
              )}
            </div>
            <textarea
              placeholder="내용을 입력하세요."
              value={textValue}
              onChange={handleTextValue}
              style={{ borderRadius: "0.2rem" }}
            />
          </div>
          <input
            type="submit"
            value="전송"
            className="send-btn"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
