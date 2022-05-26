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
  ListItemButton,
} from "@mui/material";
import PropTypes from "prop-types";

function ContactRecord() {
  /* dummy data */
  const messages = [
    {
      title: "설문제목1",
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
  ];

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
    receivers: [
      {
        id: "",
        name: "",
      },
    ],
    senderInfo: "",
    content: "",
    id: "",
  });
  const [selectedEmail, setSelectedEmail] = useState({
    title: "",
    time: "",
    count: 0,
    success: false,
    receivers: [
      {
        id: "",
        name: "",
      },
    ],
    senderInfo: "",
    texttitle: "",
    content: "",
    id: "",
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
            {messages.map((message) => (
              <div key={message.id} className="content-con">
                <ListItem
                  button
                  selected={selectedMessage === message}
                  onClick={(e) => handleListItemClick(e, message, mode)}
                  className={
                    selectedMessage.id === message.id
                      ? "content-wrap selected"
                      : "content-wrap"
                  }
                >
                  <div className="content-row one">
                    <ListItemText primary={message.title} />
                  </div>
                  <div className="content-row one">
                    <ListItemText primary={message.time} />
                    <ListItemText primary={message.count + "건"} />
                    <ListItemText
                      primary={message.success ? "전송 성공" : "전송 실패"}
                    />
                  </div>
                  <div className="content-row two">
                    {message.content.length > 20 ? (
                      <ListItemText
                        primary={message.content.substring(0, 22) + "..."}
                      />
                    ) : (
                      <ListItemText primary={message.content} />
                    )}
                  </div>
                </ListItem>
                <Divider component="li" className="content-div" />
              </div>
            ))}
          </List>
        </div>
        <div role="tabpanel" hidden={mode !== 1}>
          <List className="list-con">
            {emails.map((email) => (
              <div key={email.id} className="content-con">
                <ListItem
                  button
                  selected={selectedEmail === email}
                  onClick={(e) => handleListItemClick(e, email, mode)}
                  className={
                    selectedEmail.id === email.id
                      ? "content-wrap selected"
                      : "content-wrap"
                  }
                >
                  <div className="content-row one">
                    <ListItemText primary={email.title} />
                  </div>
                  <div className="content-row one">
                    <ListItemText primary={email.time} />
                    <ListItemText primary={email.count + "건"} />
                    <ListItemText
                      primary={email.success ? "전송 성공" : "전송 실패"}
                    />
                  </div>
                  <div className="content-row two">
                    {email.content.length > 20 ? (
                      <ListItemText
                        primary={email.content.substring(0, 22) + "..."}
                      />
                    ) : (
                      <ListItemText primary={email.content} />
                    )}
                  </div>
                </ListItem>
                <Divider component="li" className="content-div" />
              </div>
            ))}
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
            <label className="row-label">발신 정보</label>
            <input
              type="text"
              value={
                mode === 0
                  ? selectedMessage.senderInfo
                  : selectedEmail.senderInfo
              }
              className="row-input"
              disabled
            />
          </div>
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
              <label>수신자 목록</label>
            </div>
            <List className="small-list-con">
              <div className="content-con">
                {mode === 0 &&
                  selectedMessage.receivers.map((receiver, index) => (
                    <ListItem key={receiver.id} className="content">
                      <ListItemText primary={index + 1} />
                      <ListItemText primary={receiver.name} />
                    </ListItem>
                  ))}
                {mode === 1 &&
                  selectedEmail.receivers.map((receiver, index) => (
                    <ListItem key={receiver.id} className="content">
                      <ListItemText primary={index + 1} />
                      <ListItemText primary={receiver.name} />
                    </ListItem>
                  ))}
              </div>
            </List>
          </div>
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
