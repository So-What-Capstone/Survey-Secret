import React from "react";
import PropTypes from "prop-types";
import { Input, Select, Space, Divider, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "../../styles/EditQuestion.css";
const { Option } = Select;

function EditClosedQuestion({ sectionCount }) {
  const [choices, setChoices] = useState([[-1, ""]]);
  const [triggerSelect, setTriggerSelect] = useState();

  useEffect(() => {
    const options = [
      [-1, "다음 섹션으로 이동"],
      [0, "설문지 바로 제출"],
      ...[...Array(sectionCount).keys()].map((i) => [
        i + 1,
        `섹션 ${i + 1}로 이동`,
      ]),
    ];
    setTriggerSelect(
      <Select
        defaultValue={"다음 섹션으로 이동"}
        placement="bottomRight"
        dropdownMatchSelectWidth={false}
      >
        {options.map((p) => (
          <Option key={"option" + p[0]} value={p[1]}>
            {p[1]}
          </Option>
        ))}
      </Select>
    );
  }, [sectionCount]);

  return (
    <Space className="edit-body" direction="vertical">
      <div className="edit-closed-row">
        <Input
          className="edit-closed-input"
          placeholder="선택지 내용"
          addonAfter={triggerSelect}
        ></Input>
        <Button shape="circle" icon={<PlusOutlined />} />
      </div>
      <Divider>
        <Tooltip title="새 선택지 추가">
          <Button shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      </Divider>
    </Space>
  );
}

EditClosedQuestion.propTypes = {
  sectionCount: PropTypes.number,
};

function EditOpenedQuestion() {
  return <div className="edit-body edit-opened-text">단답형 텍스트</div>;
}

const typeLabelMap = {
  closed: "객관식 문항",
  opened: "주관식 문항",
};

function EditQuestion({
  sectionCount,
  config,
  data,
  onConfigChange,
  onDataChange,
}) {
  const [quesBody, setQuesBody] = useState(<React.Fragment></React.Fragment>);
  const [content, setContent] = useState(config.content);
  const [description, setDescription] = useState(config.description);
  const [type, setType] = useState(config.type);

  useEffect(() => {
    if (type === "closed") {
      setQuesBody(
        <EditClosedQuestion
          sectionCount={sectionCount}
          data={data}
        ></EditClosedQuestion>
      );
    } else if (type === "opened") {
      setQuesBody(
        <EditOpenedQuestion
          sectionCount={sectionCount}
          data={data}
        ></EditOpenedQuestion>
      );
    } else {
      console.log("Unrecognized type name: " + type);
    }
  }, [type]);

  function handleQuesTypeChange(typePair) {
    setType(typePair);
    const newConfig = { ...config, type: typePair };
    onConfigChange(newConfig);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
    const newConfig = { ...config, content: e.target.value };
    onConfigChange(newConfig);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    const newConfig = { ...config, description: e.target.value };
    onConfigChange(newConfig);
  }

  return (
    <Space className="edit-root" direction="vertical">
      <Input
        placeholder="질문 내용"
        value={content}
        addonAfter={
          <Select value={typeLabelMap[type]} onChange={handleQuesTypeChange}>
            {Object.entries(typeLabelMap).map((p) => (
              <Option key={p[0]} value={p[0]}>
                {p[1]}
              </Option>
            ))}
          </Select>
        }
        onChange={handleContentChange}
        size="large"
      ></Input>
      <Input
        placeholder="문항의 부가 설명을 입력하세요."
        value={description}
        onChange={handleDescriptionChange}
        bordered={false}
      ></Input>
      <Divider className="edit-div"></Divider>
      {quesBody}
    </Space>
  );
}

EditQuestion.propTypes = {
  sectionCount: PropTypes.number,
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
  }),
  data: PropTypes.any,
  onConfigChange: PropTypes.func,
  onDataChange: PropTypes.func,
};

export default EditQuestion;
