import React, { useState } from "react";
import "../styles/DrawLots.scss";
import { InputNumber, Button, Divider, Tag, Space } from "antd";
import PropTypes from "prop-types";
function DrawLots({ answers, setFav }) {
  // 답변 추첨
  const [numLots, setNumLots] = useState(1);
  const [winNums, setWinNums] = useState([]);

  const onChange = (e) => {
    setNumLots(e);
  };
  const onClick_draw = () => {
    if (!answers) return;
    if (numLots > answers.length) return;
    // draw lots
    let array = answers.map((v, i) => i + 1);
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setWinNums(array.slice(0, numLots));
  };
  const onClick_save = () => {
    let result = confirm(
      "현재 즐겨찾기 상태는 지워지고 추첨결과만 즐겨찾기에 등록됩니다. 계속하시겠습니까?"
    );
    if (!result) return;
    // 즐겨찾기 초기화 winNums만 즐겨찾기에 등록
    let favSubList = [];
    for (const ans of answers) {
      favSubList.push({ submissionId: ans.id, isFavorite: false });
    }

    for (const submKey of winNums) {
      favSubList[submKey - 1].isFavorite = true;
    }
    setFav(favSubList);
  };
  let max = answers ? answers.length : 1;
  return (
    <div className="draw-con">
      <div className="draw-line">
        <div className="draw-label">몇 개를 뽑을까요?</div>
        <InputNumber
          style={{ marginRight: "1rem" }}
          min={1}
          max={max}
          value={numLots}
          onChange={onChange}
        />
        <Button onClick={onClick_draw}>추첨하기</Button>
      </div>
      <Divider orientation="left">
        <div className="draw-result-label">추첨결과</div>
      </Divider>
      <div className="draw-lots-con">
        <Space wrap>
          {winNums.map((v, i) => (
            <Tag key={i} color="geekblue">
              {v}
            </Tag>
          ))}
        </Space>
      </div>
      <Button onClick={onClick_save} disabled={winNums.length === 0}>
        추첨결과 즐겨찾기로 설정
      </Button>
    </div>
  );
}
DrawLots.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      id: PropTypes.string,
      order: PropTypes.number,
    })
  ),
  setFav: PropTypes.func,
};

export default DrawLots;
