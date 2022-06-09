import React, { useState, useEffect } from "react";
import ClipTray from "../modules/ClipTray";
import "../styles/Clips.css";
import "../styles/ContactRecord.scss";
import {
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { getContacts, getMyFormsTitle } from "../API/sendQuery";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

const GET_CONTACTS_DETAIL = getContacts;
const GET_MY_FORMS_TITLE = getMyFormsTitle;

function ContactRecord() {
  const [contactList, setContactList] = useState([]);
  const [mode, setMode] = useState(0); //0:문자 메시지, 1:이메일
  //SMS, LMS
  const [smsType, setSmsType] = useState("SMS");
  const [myForms, setMyForms] = useState([]);

  const [getContactsDetail, { data, loading, error }] =
    useLazyQuery(GET_CONTACTS_DETAIL);

  const [
    getMyFormsTitle,
    { data: formData, loading: formLoading, error: formError },
  ] = useLazyQuery(GET_MY_FORMS_TITLE);

  //const [getMyFormsTitle] = useLazyQuery(GET_MY_FORMS_TITLE);

  useEffect(() => {
    const getContactsFunc = async () => {
      let queryData = await getContactsDetail({
        variables: {
          contactType: mode === 0 ? "SMS" : "EMAIL",
        },
      });

      let contactListArray = [];
      contactListArray = queryData?.data?.getSendHistory?.contacts.map((c) => {
        const obj = {};
        const dateTime = new Date(c.updatedAt);
        obj["time"] = dateTime.toLocaleString("ko-KR");
        obj["id"] = c._id;
        obj["formId"] = c.form._id;
        obj["content"] = c.content;
        obj["contactType"] = c.contactType;
        obj["success"] = true;
        obj["title"] = "삭제된 설문입니다.";
        let tempArray = [];
        c.receivers.map((r) => {
          tempArray.push(r._id);
        });

        obj["receivers"] = tempArray;
        obj["count"] = tempArray.length;
        return obj;
      });

      let myFormsTitleArray = []; //[{id, title}]

      let queryData2 = await getMyFormsTitle();

      myFormsTitleArray = queryData2.data?.me?.user?.forms?.map((f) => {
        const obj = {};
        obj["id"] = f._id;
        obj["title"] = f.title;
        return obj;
      });

      //form id 비교 -> title 설정

      contactListArray.map((c) => {
        //c.id와 같은 title 찾기
        myFormsTitleArray.map((m) => {
          if (m.id == c.formId) {
            c.title = m.title;
          }
        });
      });

      const contactListArraySorted = contactListArray.sort((a, b) =>
        a.time > b.time ? -1 : 1
      );
      setContactList(contactListArraySorted);
    };
    getContactsFunc();
  }, [mode]);

  const clips = [
    {
      title: "연락 서비스 이용기록",
      link_enabled: false,
      link: "/",
      color_idx: 0,
    },
  ];

  /* 문자메시지/이메일 발신 정보 */
  const [textTitle, setTextTitle] = useState(""); //이메일 제목
  const [textValue, setTextValue] = useState(""); //문자/이메일 내용
  const [textByte, setTextByte] = useState(0); //문자 바이트수
  const [selectedMessage, setSelectedMessage] = useState({
    title: "",
    time: "",
    count: 0,
    success: false,
    content: "",
    id: "",
    contactType: "",
    receivers: [],
  });
  const [selectedEmail, setSelectedEmail] = useState({
    title: "",
    time: "",
    count: 0,
    success: false,
    textTitle: "",
    content: "",
    id: "",
    contactType: "",
    receivers: [],
  });

  const maxByte = 100; //최대 100바이트

  const handleModeChange = async (e, newMode) => {
    setMode(newMode);
  };

  const handleListItemClick = (e, listItem, mode) => {
    if (mode === 0) {
      setSelectedMessage(listItem);
      setTextValue(listItem.content);
      checkByte(listItem.content);
    } else {
      //mode===1

      setSelectedEmail(listItem);
      setTextTitle(listItem.textTitle);
      setTextValue(listItem.content);
    }
  };

  const handleTextTitle = (e) => {
    setTextTitle(e.target.value);
  };

  const handleTextValue = (e) => {
    setTextValue(e.target.value);
    checkByte(e.target.value);
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

  TabPanel.propTypes = {
    mode: PropTypes.number,
  };

  function TabPanel({ mode }) {
    return (
      <div>
        <div role="tabpanel" hidden={mode !== 0}>
          <List className="list-con">
            {contactList &&
              contactList.map(
                (contact) =>
                  contact.contactType === "SMS" && (
                    <div key={contact.id} className="content-con">
                      <ListItem
                        button
                        selected={selectedMessage === contact}
                        onClick={(e) => handleListItemClick(e, contact, mode)}
                        className={
                          selectedMessage.id === contact.id
                            ? "content-wrap selected"
                            : "content-wrap"
                        }
                      >
                        <div className="content-row one">
                          <ListItemText primary={contact.title} />
                        </div>
                        <div className="content-row one">
                          <ListItemText primary={contact.time} />
                          <ListItemText primary={contact.count + "건"} />
                        </div>
                        <div className="content-row two">
                          {contact.content.length > 20 ? (
                            <ListItemText
                              primary={contact.content.substring(0, 22) + "..."}
                            />
                          ) : (
                            <ListItemText primary={contact.content} />
                          )}
                        </div>
                      </ListItem>
                      <Divider component="li" className="content-div" />
                    </div>
                  )
              )}
          </List>
        </div>
        <div role="tabpanel" hidden={mode !== 1}>
          <List className="list-con">
            {contactList &&
              contactList.map(
                (contact) =>
                  contact.contactType === "EMAIL" && (
                    <div key={contact.id} className="content-con">
                      <ListItem
                        button
                        selected={selectedEmail === contact}
                        onClick={(e) => handleListItemClick(e, contact, mode)}
                        className={
                          selectedEmail.id === contact.id
                            ? "content-wrap selected"
                            : "content-wrap"
                        }
                      >
                        <div className="content-row one">
                          <ListItemText primary={contact.title} />
                        </div>
                        <div className="content-row one">
                          <ListItemText primary={contact.time} />
                          <ListItemText primary={contact.count + "건"} />
                        </div>
                        <div className="content-row two">
                          {contact.content.length > 20 ? (
                            <ListItemText
                              primary={contact.content.substring(0, 22) + "..."}
                            />
                          ) : (
                            <ListItemText primary={contact.content} />
                          )}
                        </div>
                      </ListItem>
                      <Divider component="li" className="content-div" />
                    </div>
                  )
              )}
          </List>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-con">
      <ClipTray clips={clips} />
      <div className="record-con">
        <div className="record-list-panel">
          <Tabs
            value={mode}
            onChange={handleModeChange}
            className="list-tab"
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <Tab
              label="문자 메시지"
              value={0}
              className={mode === 0 ? "tab-head selected" : "tab-head"}
            />
            <Tab
              label="이메일"
              value={1}
              className={mode === 1 ? "tab-head selected" : "tab-head"}
            />
          </Tabs>
          <TabPanel mode={mode} />
        </div>
        <div className="detail-panel">
          <label className="panel-title">상세 내역</label>
          <div className="sender-row">
            <label className="row-label">발신 시각</label>
            <input
              type="text"
              value={mode === 0 ? selectedMessage.time : selectedEmail.time}
              className="row-input"
              disabled
            />
          </div>
          <div className="content-row">
            <div className="row-label-con">
              <label>발신 내용</label>
              <span></span>
              <label hidden={mode !== 0}>
                {smsType === "LMS" && <label>LMS</label>}
                {smsType === "SMS" && (
                  <label>
                    {textByte}/{maxByte}Byte
                  </label>
                )}
              </label>
            </div>
            <textarea
              value={textValue}
              placeholder=""
              onChange={handleTextValue}
              className="row-input wide"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactRecord;
