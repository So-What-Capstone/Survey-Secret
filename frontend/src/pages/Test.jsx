import React from "react";
import { useState } from "react";
import EditQuestion from "../modules/question/EditQuestion";
import {
  ClosedQuestion_mult,
  ClosedQuestion_one,
  ClosedQuestion_input,
  LinearQuestion,
} from "../modules/Questions";
import { OpenedQuestion } from "../modules/Questions";
import { GridQuestion } from "../modules/Questions";
import "../styles/Test.css";

function Test() {
  const [config1, setConfig1] = useState({
    content: "나이는 얼마입니까?",
    description: "만 나이로 답해주시기 바랍니다.",
    required: true,
    type: "closed",
  });
  const [data1, setData1] = useState({
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
  });

  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        <ClosedQuestion_one
          title="나이는 얼마입니까?"
          choices={["응답하지 않음", "10대", "20대", "30대 이상"]}
        />
        <ClosedQuestion_mult
          title="좋아하는 과일은?"
          choices={["사과", "오렌지", "딸기"]}
        />
        <ClosedQuestion_input
          title="동아리에게 바라는 점은?"
          choices={["멋진 선배", "개쩌는 경험", "잦은 회식", "기타 입력"]}
        />
        <OpenedQuestion
          title="차기 회장으로 추천하는 사람을 알려주세요."
          isLong={false}
        />
        <OpenedQuestion
          title="로봇과 인간의 미래에 대해서 어떻게 생각하는지 알려주세요."
          isLong={true}
        />
        <LinearQuestion
          title="급식에 대해 얼마나 만족하나요?"
          leftEnd={0}
          rightEnd={10}
          leftLabel="극히매우아주심히불만족"
          rightLabel="만족"
        />
        <GridQuestion
          title="오늘의 컨디션 체크"
          rowLabels={[
            "냄새가 좋다",
            "깔끔하다",
            "당당하다",
            "기운이 없다",
            "행복하다",
          ]}
          colLabels={[
            "매우 아니다",
            "아니다",
            "보통이다",
            "그렇다",
            "매우 그렇다",
          ]}
        />
      </div>
      <div className="panel">
        디자인 수정하기
        <EditQuestion
          sectionCount={1}
          config={config1}
          onConfigChange={(c) => setConfig1(c)}
          data={data1}
          onDataChange={(d) => setData1(d)}
        ></EditQuestion>
      </div>
    </div>
  );
}

export default Test;
