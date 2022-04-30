import React from "react";
import {
  ClosedQuestion_mult,
  ClosedQuestion_one,
  ClosedQuestion_input,
} from "../modules/Questions";
import { OpenedQuestion } from "../modules/Questions";
import "../styles/Test.css";

function Test() {
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
          choices={["사과", "오렌지", "딸기", "바나나", "키위", "귤"]}
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
      </div>

      <div className="panel">디자인 수정하기</div>
    </div>
  );
}

export default Test;
