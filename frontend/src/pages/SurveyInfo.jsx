import { DatePicker, TimePicker, Input, Checkbox } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/SurveryInfo.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  FIND_FORM_BY_ID_QUERY,
  getFormConfigFromDB,
} from "../modules/FormConfig";

const { TextArea } = Input;

const EDIT_FORM_MUTATION = gql`
  mutation editForm($request: EditFormInput!) {
    editForm(input: $request) {
      ok
      error
    }
  }
`;
const form_states = {
  0: "Ready",
  1: "InProgress",
  2: "Expired",
  3: "Template",
};

function SurveyInfo() {
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(0);
  useEffect(() => {
    const isLogin = true;
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
      return;
    }
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
    //로그인 된 유저가 해당 폼의 소유주인지 확인.
    const isOwner = true;
  }, [searchParams]);
  const { loading, data, error } = useQuery(FIND_FORM_BY_ID_QUERY, {
    variables: { formId },
    onCompleted: (data) => {
      console.log("Query Completed");
      console.log(data);

      const config = getFormConfigFromDB(formId, data);
      setFormConfig(config);
    },
  });

  const [editForm, { loading: mutationLoading }] = useMutation(
    EDIT_FORM_MUTATION,
    {
      onCompleted: (data) => {
        const {
          editForm: { ok, error },
        } = data;
        if (!ok) {
          throw new Error(error);
        } else {
          alert("Edit Complete");
        }
      },
    }
  );

  const save = (e) => {
    //
    let state_idx = form_minor_config.state;
    if (moment().isAfter(form_minor_config.closingAt)) {
      state_idx = 2;
    }
    editForm({
      variables: {
        request: {
          formId: formId,
          title: form_config.title,
          description: form_config.description,
          expiredAt: form_minor_config.closingAt,
          privacyExpiredAt: form_minor_config.privacyExpiredAt,
          state: form_states[state_idx],
        },
      },
    });
  };

  const navigate = useNavigate();
  const [form_config, setFormConfig] = useState(template_list[3]);
  const [form_minor_config, setFormMinorConfig] = useState({
    state: 0, // 0: designing, 1: doing survey, 2: done survey
    isPromoted: false,
    privacyExpiredAt: null,
    openingAt: null,
    closingAt: moment(),
    updatedAt: moment(),
    url: "?id=" + formId,
  });
  const editEnabled = form_minor_config.state === 0;
  const p_exp_enabled =
    form_minor_config.privacyExpiredAt !== null && editEnabled;
  const isOpeingSet = form_minor_config.openingAt !== null;
  const isClosingSet = form_minor_config.closingAt !== null;
  const showResult = () => {
    navigate("/my-survey/result/list");
  };
  const editDesign = () => {
    if (editEnabled) navigate("/my-survey/design?id=" + formId);
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
  const onOpeningEnabledChange = (e) => {
    let openingAt = null;
    if (e.target.checked) {
      openingAt = moment();
    }
    setFormMinorConfig({ ...form_minor_config, openingAt: openingAt });
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
  const onClosingEnabledChange = (e) => {
    let closingAt = null;
    if (e.target.checked) {
      closingAt = moment();
    }
    setFormMinorConfig({ ...form_minor_config, closingAt: closingAt });
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
  const onPrivacyCheckChange = (e) => {
    let new_p_exp = null;
    if (e.target.checked)
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
              <button className="setting-save-btn" onClick={save}>
                저장
              </button>
              <button className="setting-save-btn">완료</button>
            </div>
          </div>
          <div className="setting-panel-inner">
            <div className="setting-content">
              <div className="setting-line">
                <label className="setting-label">설문 링크</label>
                <Input
                  value={
                    "https://survey-secret/respond" + form_minor_config.url
                  }
                  disabled={!editEnabled}
                  readOnly
                />
              </div>
              <div className="setting-line">
                <label className="setting-label">설문 제목</label>
                <Input
                  value={form_config.title}
                  onChange={onTitleChange}
                  disabled={!editEnabled}
                />
              </div>
              <div className="setting-line">
                <label className="setting-label">설문 설명</label>
                <TextArea
                  rows={3}
                  value={form_config.description}
                  onChange={onDescChange}
                  disabled={!editEnabled}
                />
              </div>
              <div className="setting-line">
                <div className="setting-panel-title-container">
                  <label className="setting-label">설문 응답 시작 시간</label>
                </div>
                <Checkbox
                  checked={isOpeingSet}
                  onChange={onOpeningEnabledChange}
                >
                  응답 시작 시간 사용하기
                </Checkbox>
                <div className="date-time-picker">
                  <DatePicker
                    value={form_minor_config.openingAt}
                    onChange={(e) => onOpeningChange(e, true)}
                    disabled={!isOpeingSet}
                  />{" "}
                  <TimePicker
                    value={form_minor_config.openingAt}
                    onChange={(e) => onOpeningChange(e, false)}
                    disabled={!isOpeingSet}
                  />
                  <button className="setting-save-btn" onClick={setOpeningNow}>
                    지금 시작
                  </button>
                </div>
              </div>

              <div className="setting-line">
                <div className="setting-panel-title-container">
                  <label className="setting-label">설문 응답 마감 시간</label>
                </div>
                <Checkbox
                  checked={isClosingSet}
                  onChange={onClosingEnabledChange}
                >
                  응답 시작 시간 사용하기
                </Checkbox>
                <div className="date-time-picker">
                  <DatePicker
                    value={form_minor_config.closingAt}
                    onChange={(e) => onClosingChange(e, true)}
                  />{" "}
                  <TimePicker
                    value={form_minor_config.closingAt}
                    onChange={(e) => onClosingChange(e, false)}
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
                  disabled={!editEnabled}
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
