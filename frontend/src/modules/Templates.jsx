const empty_func = () => {};

const empty = {
  id: "",
  title: "빈 템플릿",
  description: "빈 템플릿 입니다.",
  sections: [
    {
      id: "a",
      title: "섹션1",
      isActive: true,
      nextSecId: "",
      questions: [
        {
          id: "1",
          type: 0,
          config: {
            content: "질문 내용",
            description: "질문 설명",
            choices: ["응답하지 않음", "선택1", "선택2", "선택3"],
            trigger_sections: ["", "", "", ""],
            required: false,
          },
          setValue: empty_func,
        },
      ],
    },
  ],
};

const simple_form = {
  id: "",
  title: "간단한 호구조사",
  description: "가족 관계 조사입니다.",
  sections: [
    {
      id: "b",
      title: "호구",
      isActive: true,
      nextSecId: "",
      questions: [
        {
          id: "1",
          type: 0,
          config: {
            content: "가족 구성원은 몇 명입니까?",
            description: "본인을 포함한 세대원",
            choices: ["1인", "2인", "3~5인", "6인 이상"],
            trigger_sections: ["", "", "", ""],
            required: false,
          },
          setValue: empty_func,
        },
        {
          id: "2",
          type: 6,
          config: {
            content: "휴대전화번호",
            description: "추첨이벤트용입니다.",
            isEncrypted: true,
            exp_date: "2999-12-31",
            required: false,
          },
          setValue: empty_func,
        },
      ],
    },
  ],
};

const simple_form2 = {
  id: "",
  title:
    "아주아주아주 간단한 설문조사 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  description:
    "설문 설명 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  sections: [
    {
      id: "aa",
      title: "호구",
      isActive: true,
      nextSecId: "",
      questions: [
        {
          id: "1",
          type: 0,
          config: {
            content: "가족 구성원은 몇 명입니까?",
            description: "본인을 포함한 세대원",
            choices: ["1인", "2인", "3~5인", "6인 이상"],
            trigger_sections: ["", "", "", "bb"],
            required: false,
          },
          setValue: empty_func,
        },
        {
          id: "2",
          type: 6,
          config: {
            content: "휴대전화번호",
            description: "추첨이벤트용입니다.",
            isEncrypted: true,
            exp_date: "2999-12-31",
            required: false,
          },
          setValue: empty_func,
        },
      ],
    },
    {
      id: "bb",
      title: "호구",
      isActive: true,
      nextSecId: "",
      questions: [
        {
          id: "3",
          type: 0,
          config: {
            content: "가족 구성원은 몇 명입니까?",
            description: "본인을 포함한 세대원",
            choices: ["1인", "2인", "3~5인", "6인 이상"],
            trigger_sections: ["", "", "", ""],
            required: false,
          },
          setValue: empty_func,
        },
        {
          id: "4",
          type: 6,
          config: {
            content: "휴대전화번호",
            description: "추첨이벤트용입니다.",
            isEncrypted: true,
            exp_date: "2999-12-31",
            required: false,
          },
          setValue: empty_func,
        },
      ],
    },
  ],
};
export const template_list = [empty, simple_form, simple_form2];
