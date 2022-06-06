import React, { useState } from "react";
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
import { getContactsDetail } from "../API/sendQuery";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

const GET_CONTACTS_DETAIL = getContactsDetail;

function ContactRecord() {
  const [contactList, setContactList] = useState([]);

  const { data, loading, error } = useQuery(GET_CONTACTS_DETAIL, {
    onCompleted: (data) => {
      setContactList(
        data?.getSendHistory?.contacts.map((c) => {
          const obj = {};
          obj["time"] = c.updatedAt;
          console.log(c.updatedAt);
          obj["id"] = c._id;
          console.log(c.updatedAt);
          obj["content"] = c.content;
          console.log(c.updatedAt);
          obj["contactType"] = c.contactType;
          console.log(c.updatedAt);
          obj["count"] = 3;
          obj["success"] = true;
          obj["senderInfo"] = "전송자";
          obj["title"] = "title";
          return obj;
        })
      );
    },
  });

  /*
  const messages = [
    {
      title: "설문제목1", //이거 추가해야함
      time: "2022/3/24 3:59",
      count: 3,
      success: true,
      receivers: [
        {
          id: "0",
          name: "닝닝",
        },
        {
          id: "1",
          name: "카리나",
        },
      ],
      senderInfo: "01012341234",
      content: "전송내용1",
      id: "0",
    },
    {
      title: "설문제목2",
      time: "1997/3/14 2:33",
      count: 2,
      success: false,
      receivers: [
        {
          id: "2",
          name: "닝닝닝",
        },
        {
          id: "3",
          name: "카리나",
        },
      ],
      senderInfo: "01010041004",
      content: "전송내용2 룰루랄라 올로랄라 릴리리맘보",
      id: "1",
    },
  ];

  const emails = [
    {
      title: "설문제목2",
      time: "전송일시2",
      count: 2,
      success: true,
      receivers: [
        {
          id: "10",
          name: "윈터",
        },
        {
          id: "13",
          name: "지젤",
        },
      ],
      senderInfo: "wusdfl@naver.com",
      textTitle: "제목입니당",
      content: "전송내용2 룰루랄라 올로랄라 릴리리맘보 올릴리리",
      id: "9",
    },
  ];*/

  const clips = [
    {
      title: "연락 서비스 이용기록",
      link_enabled: false,
      link: "/",
      color_idx: 0,
    },
  ];

  /* 문자메시지/이메일 발신 정보 */
  const [mode, setMode] = useState(0); //0:문자 메시지, 1:이메일
  const [textTitle, setTextTitle] = useState(""); //이메일 제목
  const [textValue, setTextValue] = useState(""); //문자/이메일 내용
  const [textByte, setTextByte] = useState(0); //문자 바이트수
  const [selectedMessage, setSelectedMessage] = useState({
    title: "",
    time: "",
    count: 0,
    success: false,
    senderInfo: "",
    content: "",
    id: "",
    contactType: "",
  });
  const [selectedEmail, setSelectedEmail] = useState({
    title: "",
    time: "",
    count: 0,
    success: false,
    senderInfo: "",
    textTitle: "",
    content: "",
    id: "",
    contactType: "",
  });

  const maxByte = 100; //최대 100바이트

  const handleModeChange = (e, newMode) => {
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

  const sendMessage = () => {
    console.log(textValue);
    //send Message logic
  };

  const sendEmail = () => {
    console.log(textTitle + ", " + textValue);
    //send Email logic
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
      alert("메세지는 최대" + maxByte + "byte를 초과할 수 없습니다.");
      setTextValue(newTextValue.substring(0, newTextValue.length - 1));
      totalByte -= lastByte;
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
            {contactList.map(
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
            {contactList.map(
              (contact) =>
                contact.contactType === "SMS" && (
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
          <div className="content-row"></div>
          <div className="content-row" hidden={mode !== 1}>
            <div className="row-label-con">
              <label>메일 제목</label>
            </div>
            <input
              type="text"
              value={textTitle}
              onChange={handleTextTitle}
              className="row-input"
            />
          </div>
          <div className="content-row">
            <div className="row-label-con">
              <label>발신 내용</label>
              <span></span>
              <label hidden={mode !== 0}>
                {textByte}/{maxByte}Byte
              </label>
            </div>
            <textarea
              value={textValue}
              placeholder="내용을 입력하세요."
              onChange={handleTextValue}
              className="row-input wide"
            />
          </div>
          <input
            type="submit"
            value="해당 수신자에게 재전송"
            className="send-btn"
            onClick={mode === 0 ? sendMessage : sendEmail}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactRecord;
