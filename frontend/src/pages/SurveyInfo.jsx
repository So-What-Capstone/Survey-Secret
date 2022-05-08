import { DatePicker, TimePicker, Input, Checkbox } from "antd";
import moment from "moment";
import React, { useState } from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/SurveryInfo.css";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function SurveyInfo() {
  const navigate = useNavigate();
  const [form_config, setFormConfig] = useState(template_list[0]);
  const [form_minor_config, setFormMinorConfig] = useState({
    state: 0, // 0: designing, 1: doing survey, 2: done survey
    isPromoted: false,
    privacyExpiredAt: null,
    createdAt: moment(),
    openingAt: moment(),
    closingAt: moment(),
    updatedAt: moment(),
  });
  const showResult = () => {
    navigate("/my-survey/result/list");
  };
  const editDesign = () => {
    navigate("/my-survey/design/");
  };
  const onTitleChange = (e) => {
    setFormConfig({
      ...form_config,
      title: e.target.value,
    });
  };

  const onDescChange = (e) => {
    setFormConfig({
      ...form_config,
      description: e.target.value,
    });
  };

  const onOpeningChange = (e, isDate) => {
    let mm = form_minor_config.openingAt;
    if (isDate) {
      mm.year(e.year()).month(e.month()).date(e.date());
    } else {
      mm.hour(e.hour()).minute(e.minute()).second(e.second());
    }
    setFormMinorConfig({
      ...form_minor_config,
      openingAt: mm,
    });
  };
  const onClosingChange = (e, isDate) => {
    let mm = form_minor_config.closingAt;
    if (isDate) {
      mm.year(e.year()).month(e.month()).date(e.date());
    } else {
      mm.hour(e.hour()).minute(e.minute()).second(e.second());
    }
    setFormMinorConfig({
      ...form_minor_config,
      closingAt: mm,
    });
  };
  const onPrivacyCheckChange = () => {
    let new_p_exp = null;
    if (form_minor_config.privacyExpiredAt === null)
      new_p_exp = form_minor_config.closingAt.add(3, "months");

    setFormMinorConfig({
      ...form_minor_config,
      privacyExpiredAt: new_p_exp,
    });
  };
  const onPrivacyExpChange = (e) => {
    setFormMinorConfig({ ...form_minor_config, privacyExpiredAt: e });
  };
  const setOpeningNow = () => {
    setFormMinorConfig({ ...form_minor_config, openingAt: moment() });
  };
  const setClosingNow = () => {
    setFormMinorConfig({ ...form_minor_config, closingAt: moment() });
  };
  const setPrivacyExpNow = () => {
    setFormMinorConfig({
      ...form_minor_config,
      privacyExpiredAt: moment().hour(23).minute(59).second(59),
    });
  };
  const onPromotionChange = (e) => {
    setFormMinorConfig({
      ...form_minor_config,
      isPromoted: e.target.checked,
    });
  };
  const p_exp_enabled = form_minor_config.privacyExpiredAt !== null;
  return (
    <div className="content">
      <div className="preview">
        <Form _config={form_config} />
      </div>
      <div className="info-right-panel">
        <button className="info-btn" onClick={showResult}>
          제출된 답변 확인하기
        </button>
        <button className="info-btn" onClick={editDesign}>
          설문 디자인 수정하기
        </button>
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
                <Input value={form_config.title} onChange={onTitleChange} />
              </div>
              <div className="setting-line">
                <label className="setting-label">설문 설명</label>
                <TextArea
                  rows={3}
                  value={form_config.description}
                  onChange={onDescChange}
                />
              </div>
              <div className="setting-line">
                <div className="setting-panel-title-container">
                  <label className="setting-label">설문 응답 시작 시간</label>
                </div>
                <div className="date-time-picker">
                  <DatePicker
                    value={form_minor_config.openingAt}
                    onChange={(e) => onOpeningChange(e, true)}
                  />{" "}
                  <TimePicker value={form_minor_config.openingAt} />
                  <button className="setting-save-btn" onClick={setOpeningNow}>
                    지금 시작
                  </button>
                </div>
              </div>

              <div className="setting-line">
                <div className="setting-panel-title-container">
                  <label className="setting-label">설문 응답 마감 시간</label>
                </div>
                <div className="date-time-picker">
                  <DatePicker
                    value={form_minor_config.closingAt}
                    onChange={(e) => onClosingChange(e, true)}
                  />{" "}
                  <TimePicker
                    value={form_minor_config.closingAt}
                    onChange={(e) => onClosingChange(e, true)}
                  />
                  <button className="setting-save-btn" onClick={setClosingNow}>
                    지금 마감
                  </button>
                </div>
              </div>
              <div className="setting-line">
                <div className="setting-panel-title-container">
                  <label className="setting-label">
                    개인정보 답변 만료 시간
                  </label>
                </div>
                <Checkbox
                  checked={p_exp_enabled}
                  onChange={onPrivacyCheckChange}
                >
                  만료기한 설정
                </Checkbox>
                <div className="date-time-picker">
                  <DatePicker
                    disabled={!p_exp_enabled}
                    value={form_minor_config.privacyExpiredAt}
                    onChange={onPrivacyExpChange}
                  />
                  <button
                    className="setting-save-btn"
                    onClick={setPrivacyExpNow}
                  >
                    지금 만료
                  </button>
                </div>
              </div>
              <Checkbox
                checked={form_minor_config.isPromoted}
                onChange={onPromotionChange}
              >
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
