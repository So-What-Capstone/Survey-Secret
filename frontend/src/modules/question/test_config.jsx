import React, { useState } from "react";
export const closed_config = {
  content: "나이는 얼마입니까?",
  description: "성심껏 대답해주세요.",
  choices: ["응답하지 않음", "10대", "20대", "30대 이상"],
  required: false,
};

export const closed_config_mult = {
  content: "동아리에게 바라는 점은?",
  description: "자유롭게 응답해주세요.",
  choices: ["멋진 선배", "개쩌는 경험", "잦은 회식", "기타 입력"],
  required: false,
};

export const closed_config_input = {
  content: "동아리에게 바라는 점은?",
  description: "자유롭게 응답해주세요.",
  choices: ["멋진 선배", "개쩌는 경험", "잦은 회식", "기타 입력"],
  required: false,
};

export const opened_config1 = {
  content: "차기 회장으로 추천하는 사람을 알려주세요.",
  description: "한 사람만 입력해주세요.",
  isLong: false,
  required: false,
};
export const opened_config2 = {
  content: "로봇과 인간의 미래에 대해서 어떻게 생각하는지 알려주세요.",
  description: "인간동물원",
  isLong: true,
  required: false,
};

export const linear_config = {
  content: "급식에 대해 얼마나 만족하나요?",
  description: "최근 3개월에 대하여 평가해 주세요.",
  leftEnd: 0,
  rightEnd: 10,
  leftLabel: "극히매우아주심히불만족",
  rightLabel: "만족",
  required: false,
};

export const grid_config = {
  content: "오늘의 컨디션 체크",
  description: "깊게 생각하지 말고 체크",
  rowLabels: ["냄새가 좋다", "깔끔하다", "당당하다", "기운이 없다", "행복하다"],
  colLabels: ["매우 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  required: false,
};

export const phone_config = {
  content: "연락가능한 휴대전화 번호를 입력해 주세요.",
  description: "삐용삐용",
  isEncrypted: true,
  exp_date: "1999-12-31",
  required: false,
};

export const email_config = {
  content: "메일매일",
  description: "부가설명",
  isEncrypted: true,
  exp_date: "1999-12-31",
  required: false,
};

export const date_config = {
  content: "생일입력해라",
  description: "좋은 말로 할 때",
  required: false,
};

export const addr_config = {
  content: "거주지 입력",
  description: "asdf",
  required: false,
};

// value forms
export const shortOpen = { data: "", isValid: false };
export const longOpen = { data: "", isValid: false };
export const phone = { data: "", isValid: false };
export const email = {
  id: "",
  domain_idx: 0,
  domain: "",
  isValid: false,
};
export const closed1 = { data: [], isValid: false };
export const closed2 = { data: [], isValid: false };
export const linear = { data: 0, isValid: false };
export const grid = { data: [], isValid: false };
export const date = {
  date_str: "",
  moment: null,
  isValid: false,
};
export const addr = {
  zip_code: "",
  address: "",
  address_detail: "",
  isValid: false,
};
export const init_value = [
  closed1,
  closed1,
  closed1,
  shortOpen,
  linear,
  grid,
  phone,
  email,
  date,
  addr,
];
