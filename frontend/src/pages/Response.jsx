// /response?survey={id}&section={section-id}
//survey id, section id 받아옴

//설문의 title, description은 항상 위에 띄우고
//매 섹션마다 섹션 title도 그 아래에 띄움

import React from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import PropTypes from "prop-types";

const empty_func = () => {};

/* test data - 백에서 받아온 데이터 */
const test_form = {
  id: "0",
  title: "식사 메뉴 선호조사",
  description: "식사 메뉴 선호조사입니다.",
  sections: [
    {
      id: "0",
      title: "추첨 섹션",
      isActive: true,
      nextSecId: "1",
      questions: [
        {
          id: "1",
          type: 3,
          config: {
            content: "이름을 입력해주세요.",
            description: "추첨 및 참여자 구분을 위한 정보로 사용됩니다.",
            isLong: false,
            required: true,
          },
        },
        {
          id: "2",
          type: 6,
          config: {
            content: "휴대전화번호를 입력해주세요.",
            description: "추첨을 위한 정보로 사용됩니다. 필수는 아닙니다.",
            isEncrypted: true,
            exp_date: "2999-12-31",
            required: false,
          },
        },
      ],
    },
    {
      id: "1",
      title: "음식에 관한 섹션",
      isActive: true,
      nextSecId: "2",
      questions: [
        {
          id: "1",
          type: 0,
          config: {
            content: "가장 좋아하는 음식 1가지를 선택해주세요.",
            description: "이중에 없어도 고르삼",
            choices: ["떡볶이", "곱창", "삼겹살", "피자", "양꼬치"],
            required: true,
          },
        },
        {
          id: "2",
          type: 0,
          config: {
            content: "가장 좋아하는 음식 2가지를 선택해주세요.",
            description: "이중에는 있겠지?",
            choices: ["치킨", "막창", "소고기", "샤브샤브"],
            required: true,
            isValid: true, //이게 뭐지?
          },
        },
        {
          id: "3",
          type: 1,
          config: {
            content: "고기를 좋아하나요?",
            description: "일단 난 좋아",
            choices: ["예", "아니오"],
            required: true,
          },
          //setValue: empty_func,
        },
      ],
    },
  ],
};

Response.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.any),
  }),
};

//form을 전체 다 불러옴(section array, question array 다 불러옴)
//섹션 별로 하나하나씩 보여줘야 함

function Response({ form }) {
  return (
    <div>
      <Form _config={test_form} />
    </div>
  );
}

export default Response;
