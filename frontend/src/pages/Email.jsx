import React, { useState, useEffect } from "react";
import ClipTray from "../modules/ClipTray";
import ContactList from "../modules/ContactList";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { getMyFormsForContactQuery } from "../API/meQuery";
import { sendEmail } from "../API/sendQuery";
import { tokenVar, verifyToken, logUserOut } from "./../apollo";
import { useNavigate } from "react-router-dom";
import "../styles/Clips.css";
import "../styles/Email.scss";

const GET_MY_FORMS_CONTACT_QUERY = getMyFormsForContactQuery;
const SEND_EMAIL = sendEmail;

function Email() {
  const clips = [
    { title: "이메일 서비스", link_enabled: false, link: "/", color_idx: 0 },
  ];

  const token = useReactiveVar(tokenVar);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !verifyToken()) {
      alert("로그인 후 이용해 주세요.");
      logUserOut(false);
      navigate("/login");
    }
  }, []);

  const [myForms, setMyForms] = useState([
    {
      id: "",
      title: "",
    },
  ]);

  //대표질문 내용
  const [repsQuestionContent, setRepsQuestionContent] = useState("");

  //개인정보질문 id
  const [phoneQueId, setPhoneQueId] = useState("");
  const [emailQueId, setEmailQueId] = useState("");

  /* 수신인 정보 */
  const [selectedForm, setSelectedForm] = useState({
    id: "",
    title: "",
    receivers: [],
  });

  const [checkedItems, setCheckedItems] = useState(new Set()); //체크된 수신자들(num(id)들의 배열)

  /* 이메일 발신 정보 */
  const [textTitle, setTextTitle] = useState("");
  const [textValue, setTextValue] = useState("");

  const { data, loading, error } = useQuery(GET_MY_FORMS_CONTACT_QUERY, {
    onCompleted: (data) => {
      const myFormList = data?.me?.user?.forms.map((form) => {
        const obj = {};
        obj["id"] = form._id;
        obj["title"] = form.title;
        //obj["privacyExpiredAt"] = form.privacyExpiredAt;
        return obj;
      });
      setMyForms(myFormList);
      //setSelectedForm
    },
  });

  const [sendEmailMutation, { loading: mutationLoading }] = useMutation(
    SEND_EMAIL,
    {
      onCompleted: (data) => {
        //console.log(data);
        const {
          sendEmail: { ok, error },
        } = data;
        if (!ok) {
          throw new Error(error);
        }
      },
    }
  );

  const handleTextTitle = (e) => {
    setTextTitle(e.target.value);
  };

  const handleTextValue = (e) => {
    setTextValue(e.target.value);
  };

  const sendEmail = async () => {
    //console.log("selectedFormId: " + selectedForm.id);
    //console.log(textTitle + ", " + textValue);
    const checkedItemsArray = Array.from(checkedItems); //set to array
    //console.log(checkedItemsArray);

    if (textTitle === "" || textValue === "") {
      alert("내용을 입력하세요.");
    } else {
      //send Email logic
      //console.log("개인정보질문 id :" + emailQueId);

      if (emailQueId !== "") {
        const emailVarsInput = [
          {
            key: "title",
            value: textTitle,
          },
          {
            key: "owner",
            value: "",
          },
          {
            key: "body",
            value: textValue,
          },
        ];

        let result = await sendEmailMutation({
          variables: {
            formId: selectedForm.id,
            submissionIds: checkedItemsArray,
            questionId: emailQueId,
            subject: "",
            emailVars: emailVarsInput,
          },
        });

        const {
          sendEmail: { ok, error },
        } = result.data;
        if (!ok || error) {
          alert("전송 실패하였습니다.");
          return;
        } else {
          alert("전송 성공하였습니다.");
        }
      } else {
        alert("연락 정보가 없어 전송할 수 없습니다.");
      }
    }
  };

  return (
    <div>
      <ClipTray clips={clips} />
      <div className="email-con">
        <ContactList
          forms={myForms}
          selectedForm={selectedForm}
          repsQuestionContent={repsQuestionContent}
          setRepsQuestionContent={setRepsQuestionContent}
          phoneQueId={phoneQueId}
          setPhoneQueId={setPhoneQueId}
          emailQueId={emailQueId}
          setEmailQueId={setEmailQueId}
          checkedItems={checkedItems}
          setSelectedForm={setSelectedForm}
          setCheckedItems={setCheckedItems}
        />
        <div className="detail-panel">
          <div className="content-row">
            <div className="content-label">
              <label>이메일 제목</label>
            </div>
            <input type="text" value={textTitle} onChange={handleTextTitle} />
          </div>
          <div className="content-row">
            <div className="content-label">
              <label>이메일 내용</label>
            </div>
            <textarea
              placeholder="내용을 입력하세요."
              value={textValue}
              onChange={handleTextValue}
            />
          </div>
          <input
            type="submit"
            value="전송"
            className="send-btn"
            onClick={sendEmail}
          />
        </div>
      </div>
    </div>
  );
}

export default Email;
