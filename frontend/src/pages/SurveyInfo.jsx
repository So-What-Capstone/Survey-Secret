import { DatePicker, TimePicker, Input, Checkbox } from "antd";
import React from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/SurveryInfo.css";

function SurveyInfo() {
  const form_config = template_list[0];
  return (
    <div className="content">
      <div className="preview">
        <Form _config={form_config} />
      </div>
      <div className="info-right-panel">
        <button className="info-btn">제출된 답변 확인하기</button>
        <button className="info-btn">설문 디자인 수정하기</button>
        <div className="setting-panel">
          <div className="setting-panel-title-container">
            <label className="setting-panel-title">설정</label>
            <div className="setting-btns">
              <button className="setting-save-btn">저장</button>
              <button className="setting-save-btn">완료</button>
            </div>
          </div>
          <div className="setting-panel-inner">
            <div className="setting-content">
              <div className="setting-line">
                <label className="setting-label">설문 제목</label>
                <Input />
              </div>

              <div className="setting-line">
                <label className="setting-label">설문 응답 시작 시간</label>
                <div className="date-time-picker">
                  <DatePicker /> <TimePicker />
                </div>
              </div>

              <div className="setting-line">
                <label className="setting-label">설문 응답 마감 시간</label>
                <div className="date-time-picker">
                  <DatePicker /> <TimePicker />
                </div>
              </div>
              <Checkbox>
                <label className="setting-label">배너 광고 등록</label>
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyInfo;
