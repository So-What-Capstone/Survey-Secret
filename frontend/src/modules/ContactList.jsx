import React, { useState, useEffect, useCallback } from "react";
import "../styles/ContactList.scss";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@material-ui/core";

TableItem.propTypes = {
  num: PropTypes.number,
  name: PropTypes.string,
  checkedItemHandler: PropTypes.func,
  isAllChecked: PropTypes.bool,
};

function TableItem({ num, name, checkedItemHandler, isAllChecked }) {
  //체크 여부
  const [bChecked, setChecked] = useState(false);

  //체크박스 눌렀을 때 해당 아이템을 체크리스트에 넣기/빼기
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(num, target.checked);
  };

  //전체체크 체크박스가 체크/체크해제되면 개별체크박스도 체크/체크해제
  const allCheckHandler = useCallback(() => {
    setChecked(isAllChecked);
  }, [isAllChecked]);

  //isAllChecked 값이 변하면 allCheckHandler 호출
  useEffect(() => allCheckHandler(), [isAllChecked, allCheckHandler]);

  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
        className="item-check"
      />
      <label className="item-id">{num}</label>
      <label className="item-name">{name}</label>
    </div>
  );
}

function ContactList() {
  /* 설문 + 수신인 정보 */
  const forms = [
    {
      id: 0,
      title: "누가 젤 귀여운가?",
      receivers: [
        { id: 0, name: "카리나" },
        { id: 1, name: "닝닝" },
        { id: 2, name: "윈터" },
        { id: 3, name: "지젤" },
      ],
    },
    {
      id: 1,
      title: "누가 젤 예쁜가??",
      receivers: [
        { id: 0, name: "고다현" },
        { id: 1, name: "김지윤" },
        { id: 2, name: "윈터" },
      ],
    },
  ];

  const handleFormChange = (event) => {
    const selectedId = event.target.value;
    setSelectedForm(forms.find((form) => form.id === selectedId));
    //setSelectedForm(event.target.value);
  };

  //선택된 설문
  const [selectedForm, setSelectedForm] = useState(forms[0]);

  //체크된 수신자들(num(id)들의 배열)
  const [checkedItems, setCheckedItems] = useState(new Set());

  //전체 체크 여부
  const [isAllChecked, setIsAllChecked] = useState(false);

  //체크박스 단일 선택
  const checkedItemHandler = (id, isChecked) => {
    //매개변수 이 순서로 해야 id가 checkedItems에 저장되네..?
    if (isChecked) {
      setCheckedItems(checkedItems.add(id));
      //setCheckedItems((prev) => new Set(prev.add(id)));
    } else if (!isChecked && checkedItems.has(id)) {
      //체크 해제
      checkedItems.delete(id);
      /*
      setCheckedItems((prev) => {
        return prev.filter((x) => x !== id);
      });*/
    }
    //디버깅
    checkedItems.forEach(function (value) {
      console.log(value);
    });
  };

  //전체체크 체크박스 눌렀을 때 체크리스트에 넣기/빼기
  const allCheckedHandler = (isChecked) => {
    if (isChecked) {
      let allSet = new Set();
      selectedForm.receivers.map((receiver) => allSet.add(receiver.id)); //제대로 만들어짐
      setCheckedItems(allSet); //이게 안됨
      setIsAllChecked(true);
    } else {
      checkedItems.clear();
      setIsAllChecked(false);
    }
  };

  //전체체크 체크박스 여부
  const [bChecked, setChecked] = useState(false);

  //전체체크 체크박스 눌렀을 때의 행동
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    allCheckedHandler(target.checked);

    //디버깅 - checkedItems에 안들어갔음
    checkedItems.forEach(function (value) {
      console.log(value);
    });
  };

  return (
    <div className="list-panel">
      <div className="panel-row">
        <label htmlFor="formSelect">설문 선택</label>
        <Select
          value={selectedForm.id}
          label="설문 선택"
          onChange={handleFormChange}
          className="row-select"
        >
          {forms.map((form) => (
            <MenuItem key={form.id} value={form.id}>
              {form.title}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="panel-row">
        <label>수신인 선택</label>
        <div className="row-list">
          <div className="row-list-head">
            <input
              type="checkbox"
              checked={bChecked}
              onChange={(e) => checkHandler(e)}
              className="all-check"
            />
            <input type="button" value="즐겨찾기 선택" className="star-btn" />
          </div>
          <div className="list-con">
            {selectedForm.receivers.map((receiver) => (
              <TableItem
                num={receiver.id}
                name={receiver.name}
                isAllChecked={isAllChecked}
                checkedItemHandler={checkedItemHandler}
                key={receiver.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
