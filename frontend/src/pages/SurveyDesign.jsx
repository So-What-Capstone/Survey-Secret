import { Divider, Typography, Input } from "antd";
import React, { useEffect, useState } from "react";
import "../styles/SurveyDesign.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import addrImage from "../resources/addr.png";
import emailImage from "../resources/email.png";
import gridImage from "../resources/grid.png";
import linearImage from "../resources/linear.png";
import longImage from "../resources/long.png";
import multImage from "../resources/mult.png";
import oneImage from "../resources/one.png";
import phoneImage from "../resources/phone.png";
import shortImage from "../resources/short.png";
import { EditQuestion } from "../modules";

const dummyData = [
  {
    _id: "023425989345",
    title: "섹션 제목",
    questions: [
      {
        _id: "246304623",
        content: "나이가 어떻게 되시나요?",
        description: "만 나이로 답해주시기 바랍니다.",
        required: true,
        type: "closed",
        allowMultiple: false,
        choices: [
          {
            content: "응답하지 않음",
            trigger: -1,
          },
          {
            content: "10대",
            trigger: -1,
          },
          {
            content: "20대",
            trigger: -1,
          },
          {
            content: "30대 이상",
            trigger: -1,
          },
        ],
      },
      {
        _id: "3460980953",
        content: "동아리에 바라는 점은?",
        description: "자유롭게 응답해주세요.",
        required: true,
        type: "closed",
        allowMultiple: true,
        choices: [
          {
            content: "멋진 선배",
            trigger: -1,
          },
          {
            content: "개쩌는 경험",
            trigger: -1,
          },
          {
            content: "잦은 회식",
            trigger: -1,
          },
          {
            content: "기타",
            trigger: -1,
          },
        ],
      },
    ],
  },
];

function SurveyDesign() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [lastFocused, setLastFocused] = useState(undefined);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      console.log(`id is ${id}`);
      // 디버그를 위해 임의의 데이터로 설정
      setSections(dummyData);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const updateSectionTitleChange = (sectIdx) => (event) => {
    let newSections = [...sections];
    newSections[sectIdx].title = event.target.value;
    setSections(newSections);
  };

  const updateQuestionData = (sectIdx, quesIdx) => (data) => {
    let newSections = [...sections];
    newSections[sectIdx].questions[quesIdx] = data;
    setSections(newSections);
  };

  const removeQuestion = (sectIdx, quesIdx) => () => {
    let newSections = [...sections];
    newSections[sectIdx].questions.splice(quesIdx, 1);
    setSections(newSections);
  };

  const paletteData = [
    {
      key: "closed",
      subtitle: "객관식 문항",
      children: [
        {
          key: "one",
          image: oneImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "closed",
              allowMultiple: false,
              choices: [],
            };
          },
        },
        {
          key: "mult",
          image: multImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "closed",
              allowMultiple: true,
              choices: [],
            };
          },
        },
      ],
    },
    {
      key: "opened",
      subtitle: "주관식 문항",
      children: [
        {
          key: "short",
          image: shortImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "opened",
              allowMultiple: false,
            };
          },
        },
        {
          key: "long",
          image: longImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "opened",
              allowMultiple: true,
            };
          },
        },
      ],
    },
    {
      key: "advanced-opened",
      subtitle: "고급 객관식 문항",
      children: [
        {
          key: "linear",
          image: linearImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "linear",
              leftRange: 0,
              leftLabel: "낮음",
              rightRange: 10,
              rightLabel: "높음",
            };
          },
        },
        {
          key: "grid",
          image: gridImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "grid",
              rowContent: ["행 1", "행 2"],
              colContent: ["열 1", "열 2"],
            };
          },
        },
      ],
    },
    {
      key: "private",
      subtitle: "개인정보 문항",
      children: [
        {
          key: "addr",
          image: addrImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "address",
            };
          },
        },
        {
          key: "email",
          image: emailImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "email",
            };
          },
        },
        {
          key: "phone",
          image: phoneImage,
          init: () => {
            return {
              _id: String(Math.random()),
              content: "",
              description: "",
              required: false,
              type: "phone",
            };
          },
        },
      ],
    },
  ];

  const addQuestion = (init) => () => {
    let sectIdx, quesIdx;
    if (
      lastFocused === undefined ||
      !(
        lastFocused[0] < sections.length &&
        lastFocused[1] < sections[lastFocused[0]].questions.length
      )
    ) {
      sectIdx = sections.length - 1;
      quesIdx = sections[sectIdx].questions.length;
    } else {
      sectIdx = lastFocused[0];
      quesIdx = lastFocused[1];
    }
    let newSections = [...sections];
    newSections[sectIdx].questions.splice(quesIdx + 1, 0, init());
    setSections(newSections);
  };

  return (
    <div className="design-root">
      <div className="design-palette">
        <Typography.Title level={5} className="design-title">
          문항 팔레트
        </Typography.Title>
        {paletteData.map((group) => (
          <div key={group.key} className="design-inner-palette">
            <Typography.Title level={5} className="design-subtitle">
              {group.subtitle}
            </Typography.Title>
            <div className="design-ques-layout">
              {group.children.map((ques) => (
                <div key={ques.key} className="design-ques-back">
                  <img
                    className="design-ques-image"
                    src={ques.image}
                    onClick={addQuestion(ques.init)}
                  ></img>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="design-preview">
        <div className="design-preview-header">
          <div>
            <Typography.Title level={5} className="design-title">
              설문제목 - 2022 행복 로봇 동아리 회원 모집
            </Typography.Title>
          </div>
          <div className="design-preview-btngroup">
            <button className="design-button">저장</button>
            <button className="design-button">완료</button>
          </div>
        </div>
        <div className="design-preview-body">
          {sections.map((sect, i) => (
            <div className="design-section" key={sect._id}>
              <Divider>
                <Input
                  className="design-section-title"
                  addonBefore={`${i + 1}번째 섹션 제목`}
                  value={sect.title}
                  onChange={updateSectionTitleChange(i)}
                ></Input>
              </Divider>

              {sect.questions.map((ques, j) => (
                <EditQuestion
                  onFocus={() => {
                    setLastFocused([i, j]);
                  }}
                  onRemove={removeQuestion(i, j)}
                  key={ques._id}
                  sectionCount={sections.length}
                  data={ques}
                  onDataChange={updateQuestionData(i, j)}
                ></EditQuestion>
              ))}
              <Divider>{`${i + 1}번째 섹션 끝`}</Divider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyDesign;
