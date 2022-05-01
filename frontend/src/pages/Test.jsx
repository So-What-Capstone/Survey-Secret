import React from "react";
import "../styles/Test.css";
import {
  ClosedQuestion_one,
  ClosedQuestion_mult,
  ClosedQuestion_input,
  OpenedQuestion,
  LinearQuestion,
  GridQuestion,
  PhoneQuestion,
  EmailQuestion,
  DateQuestion,
  AddressQuestion,
} from "../modules/index.js";

function Test() {
  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        <ClosedQuestion_one
          title="나이는 얼마입니까?"
          disc="성심껏 대답해주세요."
          choices={["응답하지 않음", "10대", "20대", "30대 이상"]}
        />
        <ClosedQuestion_mult
          title="좋아하는 과일은?"
          disc="복수 응답 가능"
          choices={["사과", "오렌지", "딸기"]}
        />
        <ClosedQuestion_input
          title="동아리에게 바라는 점은?"
          disc="자유롭게 응답해주세요."
          choices={["멋진 선배", "개쩌는 경험", "잦은 회식", "기타 입력"]}
        />
        <OpenedQuestion
          title="차기 회장으로 추천하는 사람을 알려주세요."
          disc="한 사람만 입력해주세요."
          isLong={false}
        />
        <OpenedQuestion
          title="로봇과 인간의 미래에 대해서 어떻게 생각하는지 알려주세요."
          disc="인간동물원"
          isLong={true}
        />
        <LinearQuestion
          title="급식에 대해 얼마나 만족하나요?"
          disc="최근 3개월에 대하여 평가해 주세요."
          leftEnd={0}
          rightEnd={10}
          leftLabel="극히매우아주심히불만족"
          rightLabel="만족"
        />
        <GridQuestion
          title="오늘의 컨디션 체크"
          disc="깊게 생각하지 말고 체크"
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
        <PhoneQuestion
          title="연락가능한 휴대전화 번호를 입력해 주세요."
          disc="삐용삐용"
          isEncrypted={true}
          exp_date="1999-12-31"
        />
        <EmailQuestion title="메일매일" disc="부가설명" />
        <DateQuestion title="생일입력해라" disc="좋은 말로 할 때" />
        <AddressQuestion title="거주지 입력" />
      </div>
      <div className="panel">디자인 수정하기</div>
    </div>
  );
}

export default Test;
