import React, { useState, useEffect, useCallback } from "react";
import "../styles/ContactList.scss";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@mui/material";

TableItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checkedItemHandler: PropTypes.func,
  isAllChecked: PropTypes.bool,
  bAllChecked: PropTypes.bool,
  setAllChecked: PropTypes.func,
  order: PropTypes.number,
};

function TableItem({
  id,
  name,
  checkedItemHandler,
  isAllChecked,
  bAllChecked,
  setAllChecked,
  order,
}) {
  //각 item 체크 여부
  const [bChecked, setChecked] = useState(false);

  //체크박스 눌렀을 때 해당 아이템을 체크리스트에 넣기/빼기
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    if (bAllChecked && bChecked) {
      setAllChecked(!bAllChecked);
    }
    checkedItemHandler(id, target.checked);
  };

  //isAllChecked가 true(전체체크박스에 체크되면)면 이 체크박스도 체크
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
      <label className="item-order">{order}</label>
      <label className="item-name">{name}</label>
    </div>
  );
}

ContactList.propTypes = {
  forms: PropTypes.array,
  selectedForm: PropTypes.object,
  checkedItems: PropTypes.object,
  setSelectedForm: PropTypes.func,
  setCheckedItems: PropTypes.func,
};

/**
 * ContactList
 */
function ContactList({
  forms,
  selectedForm,
  checkedItems,
  setSelectedForm,
  setCheckedItems,
}) {
  const handleFormChange = (event) => {
    const selectedId = event.target.value;
    setSelectedForm(forms.find((form) => form.id === selectedId));
    checkedItems.clear();
    setIsAllChecked(false);
    setAllChecked(false);
  };

  //전체 체크 여부
  const [isAllChecked, setIsAllChecked] = useState(false);

  //체크박스 단일 선택
  const checkedItemHandler = (id, isChecked) => {
    //매개변수 이 순서로 해야 id가 checkedItems에 저장되네..?
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      //체크 해제
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
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
  const [bAllChecked, setAllChecked] = useState(false);

  //전체체크 체크박스 눌렀을 때의 행동
  const checkHandler = ({ target }) => {
    setAllChecked(!bAllChecked);
    allCheckedHandler(target.checked);
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
              checked={bAllChecked}
              onChange={(e) => checkHandler(e)}
              className="all-check"
            />
            <span></span>
            <input type="button" value="즐겨찾기 선택" className="star-btn" />
          </div>
          <div className="list-con">
            {selectedForm.receivers.map((receiver, index) => (
              <TableItem
                id={receiver.id}
                name={receiver.name}
                isAllChecked={isAllChecked}
                checkedItemHandler={checkedItemHandler}
                bAllChecked={bAllChecked}
                setAllChecked={setAllChecked}
                key={receiver.id}
                order={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
