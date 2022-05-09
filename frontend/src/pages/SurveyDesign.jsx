import { Divider, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "../styles/SurveyDesign.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import addrImage from "../resources/addr.svg";
import emailImage from "../resources/email.svg";
import gridImage from "../resources/grid.svg";
import linearImage from "../resources/linear.svg";
import longImage from "../resources/long.svg";
import multImage from "../resources/mult.svg";
import oneImage from "../resources/one.svg";
import phoneImage from "../resources/phone.svg";
import shortImage from "../resources/short.svg";
import { EditQuestion } from "../modules";

const dummyData = [
  {
    id: "0",
    title: "섹션 제목",
    questions: [
      {
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

  const updateQuestionData = (sectIdx, quesIdx) => (data) => {
    let newSections = [...sections];
    newSections[sectIdx][quesIdx] = data;
    setSections(newSections);
  };

  const paletteData = [
    {
      subtitle: "객관식 문항",
      children: [
        {
          image: oneImage,
          clickHandler: () => {},
        },
        {
          image: multImage,
          clickHandler: () => {},
        },
      ],
    },
    {
      subtitle: "주관식 문항",
      children: [
        {
          image: shortImage,
          clickHandler: () => {},
        },
        {
          image: longImage,
          clickHandler: () => {},
        },
      ],
    },
    {
      subtitle: "고급 객관식 문항",
      children: [
        {
          image: linearImage,
          clickHandler: () => {},
        },
        {
          image: gridImage,
          clickHandler: () => {},
        },
      ],
    },
    {
      subtitle: "개인정보 문항",
      children: [
        {
          image: addrImage,
          clickHandler: () => {},
        },
        {
          image: emailImage,
          clickHandler: () => {},
        },
        {
          image: phoneImage,
          clickHandler: () => {},
        },
      ],
    },
  ];

  return (
    <div className="design-root">
      <div className="design-palette">
        <Typography.Title level={5} className="design-title">
          문항 팔레트
        </Typography.Title>
        {paletteData.map((group, i) => (
          <div key={`group-${i}`} className="design-inner-palette">
            <Typography.Title level={5} className="design-subtitle">
              {group.subtitle}
            </Typography.Title>
            <div className="design-ques-layout">
              {group.children.map((ques, j) => (
                <div key={`ques-${j}`} className="design-ques-back">
                  <img className="design-ques-image" src={ques.image}></img>
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
            <div className="design-section" key={`sect-${i}`}>
              <Divider>{`섹션 시작 - "${sect.title}"`}</Divider>
              {sect.questions.map((ques, j) => (
                <EditQuestion
                  onFocus={() => {
                    setLastFocused([i, j]);
                  }}
                  key={`ques-${i}-${j}`}
                  sectionCount={sections.length}
                  data={ques}
                  onDataChange={updateQuestionData}
                ></EditQuestion>
              ))}
              <Divider>{`섹션 끝 - "${sect.title}"`}</Divider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyDesign;
