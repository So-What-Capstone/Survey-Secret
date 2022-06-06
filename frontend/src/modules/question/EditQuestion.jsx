import React from "react";
import PropTypes from "prop-types";
import {
  Input,
  Select,
  Space,
  Divider,
  Button,
  Tooltip,
  Dropdown,
  Menu,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Alert,
  Empty,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "../../styles/EditQuestion.css";
const { Option } = Select;

function EditClosedQuestion({ sectionCount, data, onDataChange, disabled }) {
  const [choices, setChoices] = useState(data.choices ? data.choices : []);
  const [triggerOptions, setTriggerOptions] = useState([]);
  const [allowMultiple, setAllowMultiple] = useState(data.allowMultiple);
  const [showTriggerSelect, setShowTriggerSelect] = useState(
    data.choices.find((ch) => ch.trigger !== -1)
  );

  function getTriggerLabel(trigger) {
    if (trigger === -1) {
      return "트리거 없음";
    } else {
      return `섹션 ${trigger}로 이동`;
    }
  }

  useEffect(() => {
    setTriggerOptions([
      [-1, getTriggerLabel(-1)],
      ...[...Array(sectionCount).keys()].map((i) => [
        i,
        getTriggerLabel(i + 1),
      ]),
    ]);
  }, [sectionCount]);

  const handleTriggerChange = (i) => (value) => {
    let newChoices = [...choices];
    newChoices[i].trigger = value;
    setChoices(newChoices);
    onDataChange({ ...data, choices: newChoices });
  };

  function handleCheckboxChange(event) {
    setAllowMultiple(event.target.checked);
    // 복수 선택이라면 트리거 설정을 할 수 없도록 함.
    if (event.target.checked) {
      setShowTriggerSelect(false);
    }
    onDataChange({ ...data, allowMultiple: event.target.checked });
  }

  function addChoice() {
    let newChoices = [
      ...choices,
      { content: "", trigger: -1, key: new Date().getTime() },
    ];
    setChoices(newChoices);
    onDataChange({ ...data, choices: newChoices });
  }

  const addChoiceBelow = (i) => () => {
    let newChoices = [...choices];
    newChoices.splice(i + 1, 0, {
      content: "",
      trigger: -1,
      key: new Date().getTime(),
    });
    setChoices(newChoices);
    onDataChange({ ...data, choices: newChoices });
  };

  const moveUpward = (i) => () => {
    if (i > 0) {
      let newChoices = [...choices];
      [newChoices[i - 1], newChoices[i]] = [newChoices[i], newChoices[i - 1]];
      setChoices(newChoices);
      onDataChange({ ...data, choices: newChoices });
    }
  };

  const moveDownward = (i) => () => {
    if (i + 1 < choices.length) {
      let newChoices = [...choices];
      [newChoices[i], newChoices[i + 1]] = [newChoices[i + 1], newChoices[i]];
      setChoices(newChoices);
      onDataChange({ ...data, choices: newChoices });
    }
  };

  const remove = (i) => () => {
    let newChoices = [...choices];
    newChoices.splice(i, 1);
    setChoices(newChoices);
    onDataChange({ ...data, choices: newChoices });
  };

  const editContent = (i) => (event) => {
    let newChoices = [...choices];
    newChoices[i].content = event.target.value;
    setChoices(newChoices);
    onDataChange({ ...data, choices: newChoices });
  };

  return (
    <Space className="edit-body" direction="vertical">
      <Checkbox
        checked={allowMultiple}
        onChange={handleCheckboxChange}
        disabled={disabled}
      >
        복수 선택 허용
      </Checkbox>
      <Checkbox
        disabled={allowMultiple}
        checked={showTriggerSelect}
        onChange={(event) => setShowTriggerSelect(event.target.checked)}
      >
        선택지 트리거 설정 보이기
      </Checkbox>

      {choices.length === 0 ? (
        <Empty description="문항에 선택지가 없습니다."></Empty>
      ) : (
        choices.map((c, i) => (
          <div key={c.key} className="edit-closed-row">
            <Input
              disabled={disabled}
              className="edit-closed-input"
              placeholder="선택지 내용"
              value={c.content}
              onChange={editContent(i)}
              addonAfter={
                showTriggerSelect ? (
                  <Select
                    disabled={disabled}
                    value={c.trigger}
                    placement="bottomRight"
                    dropdownMatchSelectWidth={false}
                    onChange={handleTriggerChange(i)}
                  >
                    {triggerOptions.map((p) => (
                      <Option key={"option" + p[0]} value={p[0]}>
                        {p[1]}
                      </Option>
                    ))}
                  </Select>
                ) : null
              }
            ></Input>
            <Dropdown.Button
              disabled={disabled}
              onClick={addChoiceBelow(i)}
              overlay={
                <Menu>
                  <Menu.Item onClick={moveDownward(i)}>아래로 이동</Menu.Item>
                  <Menu.Item onClick={moveUpward(i)}>위로 이동</Menu.Item>
                  <Menu.Item onClick={remove(i)}>삭제</Menu.Item>
                </Menu>
              }
            >
              <Tooltip title="아래에 새 선택지 추가">
                <PlusOutlined />
              </Tooltip>
            </Dropdown.Button>
          </div>
        ))
      )}
      <Divider>
        <Tooltip title="새 선택지 추가">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={addChoice}
            disabled={disabled}
          />
        </Tooltip>
      </Divider>
    </Space>
  );
}

EditClosedQuestion.propTypes = {
  sectionCount: PropTypes.number,
  data: PropTypes.shape({
    allowMultiple: PropTypes.bool,
    choices: PropTypes.arrayOf({
      content: PropTypes.string,
      trigger: PropTypes.number,
    }),
  }),
  onDataChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function EditOpenedQuestion({ data, onDataChange, disabled }) {
  const [allowMultiple, setAllowMultiple] = useState(data.allowMultiple);

  function handleCheckboxChange(event) {
    setAllowMultiple(event.target.checked);
    onDataChange({ ...data, allowMultiple: event.target.checked });
  }

  return (
    <div className="edit-body">
      <Checkbox
        checked={allowMultiple}
        onChange={handleCheckboxChange}
        disabled={disabled}
      >
        여러 줄 입력 허용
      </Checkbox>

      <div className="edit-opened-text">
        {allowMultiple ? "장" : "단"}답형 텍스트
      </div>
    </div>
  );
}

EditOpenedQuestion.propTypes = {
  data: PropTypes.shape({
    allowMultiple: PropTypes.bool,
  }),
  onDataChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function EditLinearQuestion({ data, onDataChange, disabled }) {
  const [leftRange, setLeftRange] = useState(data.leftRange);
  const [rightRange, setRightRange] = useState(data.rightRange);
  const [leftLabel, setLeftLabel] = useState(data.leftLabel);
  const [rightLabel, setRightLabel] = useState(data.rightLabel);

  function changeLeftRange(value) {
    setLeftRange(value);
    setRightRange(Math.max(value + 1, data.rightRange));
    onDataChange({
      ...data,
      leftRange: value,
      rightRange: Math.max(value + 1, data.rightRange),
    });
  }

  function changeRightRange(value) {
    setLeftRange(Math.min(value - 1, data.leftRange));
    setRightRange(value);
    onDataChange({
      ...data,
      leftRange: Math.min(value - 1, data.leftRange),
      rightRange: value,
    });
  }

  function changeLeftLabel(event) {
    setLeftLabel(event.target.value);
    onDataChange({ ...data, leftLabel: event.target.value });
  }

  function changeRightLabel(event) {
    setRightLabel(event.target.value);
    onDataChange({ ...data, rightLabel: event.target.value });
  }

  return (
    <div className="edit-body">
      <div className="edit-linear-row">
        <span className="edit-linear-label">최솟값:</span>
        <InputNumber
          min={0}
          max={100}
          value={leftRange}
          onChange={changeLeftRange}
          disabled={disabled}
        ></InputNumber>
        <span className="edit-linear-label">최솟값 설명:</span>
        <Input
          value={leftLabel}
          onChange={changeLeftLabel}
          disabled={disabled}
        ></Input>
      </div>
      <div className="edit-linear-row">
        <span className="edit-linear-label">최댓값:</span>
        <InputNumber
          min={0}
          max={100}
          value={rightRange}
          onChange={changeRightRange}
          disabled={disabled}
        ></InputNumber>
        <span className="edit-linear-label">최댓값 설명:</span>
        <Input
          value={rightLabel}
          onChange={changeRightLabel}
          disabled={disabled}
        ></Input>
      </div>
    </div>
  );
}

EditLinearQuestion.propTypes = {
  data: PropTypes.shape({
    leftRange: PropTypes.number,
    rightRange: PropTypes.number,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
  }),
  onDataChange: PropTypes.func,
  disabled: PropTypes.bool,
};

// Used for EditGridQuestion
function ListMaintainer({ title, list, onListChange, disabled }) {
  const [choices, setChoices] = useState(list ? list : []);

  function addChoice() {
    let newChoices = [...choices, ""];
    setChoices(newChoices);
    onListChange(newChoices);
  }

  const addChoiceBelow = (i) => () => {
    let newChoices = [...choices];
    newChoices.splice(i + 1, 0, "");
    setChoices(newChoices);
    onListChange(newChoices);
  };

  const moveUpward = (i) => () => {
    if (i > 0) {
      let newChoices = [...choices];
      [newChoices[i - 1], newChoices[i]] = [newChoices[i], newChoices[i - 1]];
      setChoices(newChoices);
      onListChange(newChoices);
    }
  };

  const moveDownward = (i) => () => {
    if (i + 1 < choices.length) {
      let newChoices = [...choices];
      [newChoices[i], newChoices[i + 1]] = [newChoices[i + 1], newChoices[i]];
      setChoices(newChoices);
      onListChange(newChoices);
    }
  };

  const remove = (i) => () => {
    let newChoices = [...choices];
    newChoices.splice(i, 1);
    setChoices(newChoices);
    onListChange(newChoices);
  };

  const editContent = (i) => (event) => {
    let newChoices = [...choices];
    newChoices[i] = event.target.value;
    setChoices(newChoices);
    onListChange(newChoices);
  };

  return (
    <Space className="listman-root" direction="vertical">
      <Divider>{title}</Divider>
      {choices.length === 0 ? (
        <Empty description={`${title}에 해당하는 선택지가 없습니다.`}></Empty>
      ) : (
        choices.map((c, i) => (
          <div key={i} className="listman-row">
            <Input
              placeholder="내용"
              value={c}
              onChange={editContent(i)}
              disabled={disabled}
            ></Input>
            <Dropdown.Button
              disabled={disabled}
              onClick={addChoiceBelow(i)}
              overlay={
                <Menu>
                  <Menu.Item onClick={moveDownward(i)}>아래로 이동</Menu.Item>
                  <Menu.Item onClick={moveUpward(i)}>위로 이동</Menu.Item>
                  <Menu.Item onClick={remove(i)}>삭제</Menu.Item>
                </Menu>
              }
            >
              <Tooltip title="아래에 새 선택지 추가">
                <PlusOutlined />
              </Tooltip>
            </Dropdown.Button>
          </div>
        ))
      )}
      <Divider>
        <Tooltip title="새 선택지 추가">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={addChoice}
            disabled={disabled}
          />
        </Tooltip>
      </Divider>
    </Space>
  );
}

ListMaintainer.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  onListChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function EditGridQuestion({ data, onDataChange, disabled }) {
  const [rowContent, setRowContent] = useState(
    data.rowContent ? data.rowContent : []
  );
  const [colContent, setColContent] = useState(
    data.colContent ? data.colContent : []
  );

  function changeRowContent(list) {
    setRowContent(list);
    onDataChange({ ...data, rowContent: list });
  }

  function changeColContent(list) {
    setColContent(list);
    onDataChange({ ...data, colContent: list });
  }

  return (
    <Row>
      <Col span={10} offset={1}>
        <ListMaintainer
          disabled={disabled}
          title="행 내용"
          list={rowContent}
          onListChange={changeRowContent}
        ></ListMaintainer>
      </Col>
      <Col span={10} offset={2}>
        <ListMaintainer
          disabled={disabled}
          title="열 내용"
          list={colContent}
          onListChange={changeColContent}
        ></ListMaintainer>
      </Col>
    </Row>
  );
}

EditGridQuestion.propTypes = {
  data: PropTypes.shape({
    rowContent: PropTypes.arrayOf(PropTypes.string),
    colContent: PropTypes.arrayOf(PropTypes.string),
  }),
  onDataChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function EditPhoneQuestion() {
  const info =
    "피조사자가 응답한 내용은 암호화되어 서버에 저장되고, " +
    "조사자는 피조사자의 전화번호를 직접 알 수 없습니다. " +
    "피조사자에게 연락을 취해야 하는 경우 본 서비스의 " +
    "문자 메세지 전송 기능을 이용하실 수 있습니다.";

  return (
    <div className="edit-body">
      <div className="edit-opened-text">전화번호 응답</div>
      <Alert
        message="응답 데이터가 서버에 암호화되어 보호됩니다."
        description={info}
        type="info"
        showIcon
      ></Alert>
    </div>
  );
}

function EditEmailQuestion() {
  const info =
    "피조사자가 응답한 내용은 암호화되어 서버에 저장되고, " +
    "조사자는 피조사자의 이메일 주소를 직접 알 수 없습니다. " +
    "피조사자에게 연락을 취해야 하는 경우 본 서비스의 " +
    "이메일 전송 기능을 이용하실 수 있습니다.";

  return (
    <div className="edit-body">
      <div className="edit-opened-text">이메일 응답</div>
      <Alert
        message="응답 데이터가 서버에 암호화되어 보호됩니다."
        description={info}
        type="info"
        showIcon
      ></Alert>
    </div>
  );
}

function EditDateQuestion() {
  return <div className="edit-body edit-opened-text">날짜 응답</div>;
}

function EditAddressQuestion() {
  return <div className="edit-body edit-opened-text">주소 응답</div>;
}

const typeLabelMap = {
  closed: "객관식 문항",
  opened: "주관식 문항",
  linear: "선형 배율 문항",
  grid: "객관식 그리드 문항",
  phone: "전화번호 문항 (암호화됨)",
  email: "이메일 문항 (암호화됨)",
  date: "날짜 문항",
  address: "주소 문항",
};

const typeCompMap = {
  closed: EditClosedQuestion,
  opened: EditOpenedQuestion,
  linear: EditLinearQuestion,
  grid: EditGridQuestion,
  phone: EditPhoneQuestion,
  email: EditEmailQuestion,
  date: EditDateQuestion,
  address: EditAddressQuestion,
};

function EditQuestion({
  sectionCount,
  data,
  onDataChange,
  onRemove,
  disabled,
  ...rprops
}) {
  const [quesBody, setQuesBody] = useState(<React.Fragment></React.Fragment>);
  const [required, setRequired] = useState(!!data.required);
  const [content, setContent] = useState(data.content);
  const [description, setDescription] = useState(data.description);
  const [type, setType] = useState(data.type);

  useEffect(() => {
    if (type in typeCompMap) {
      const QuesComp = typeCompMap[type];
      setQuesBody(
        <QuesComp
          sectionCount={sectionCount}
          data={data}
          onDataChange={onDataChange}
          disabled={disabled}
        ></QuesComp>
      );
    } else {
      console.log("Unrecognized type name: " + type);
    }
  }, [type, data, onDataChange, sectionCount, disabled]);

  function handleQuesTypeChange(typePair) {
    setType(typePair);
    const newConfig = { ...data, type: typePair };
    onDataChange(newConfig);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
    const newConfig = { ...data, content: e.target.value };
    onDataChange(newConfig);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    const newConfig = { ...data, description: e.target.value };
    onDataChange(newConfig);
  }

  function handleRemove() {
    onRemove();
  }

  function handleCheckboxChange(event) {
    setRequired(event.target.checked);
    onDataChange({ ...data, required: event.target.checked });
  }

  return (
    <Space className="edit-root" direction="vertical" {...rprops}>
      <Input
        placeholder="질문 내용"
        value={content}
        onChange={handleContentChange}
        size="large"
        addonAfter={
          <Tooltip title="문항 삭제">
            <CloseOutlined
              className="edit-remove"
              disabled={disabled}
              onClick={disabled ? undefined : handleRemove}
            />
          </Tooltip>
        }
        addonBefore={
          <Select
            value={typeLabelMap[type]}
            onChange={handleQuesTypeChange}
            disabled={disabled}
          >
            {Object.entries(typeLabelMap).map((p) => (
              <Option key={p[0]} value={p[0]}>
                {p[1]}
              </Option>
            ))}
          </Select>
        }
        disabled={disabled}
      ></Input>
      <Checkbox
        checked={required}
        onChange={handleCheckboxChange}
        disabled={disabled}
      >
        필수적으로 응답하도록 설정
      </Checkbox>
      <Input
        placeholder="문항의 부가 설명을 입력하세요."
        value={description}
        onChange={handleDescriptionChange}
        bordered={false}
        disabled={disabled}
      ></Input>
      <Divider className="edit-div"></Divider>
      {quesBody}
    </Space>
  );
}

EditQuestion.propTypes = {
  sectionCount: PropTypes.number,
  data: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
  }),
  onDataChange: PropTypes.func,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EditQuestion;
