const empty_func = () => {};

const empty = {
  id: "",
  title: "빈 템플릿",
  description: "빈 템플릿 입니다.",
  sections: [
    {
      id: "",
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
            required: false,
          },
          setValue: empty_func,
        },
      ],
    },
  ],
};

export const template_list = [empty];
