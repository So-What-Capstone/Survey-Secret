import {
  Divider,
  Typography,
  Input,
  message,
  Modal,
  Empty,
  Switch,
  DatePicker,
  Radio,
  Spin,
  Tooltip,
  Button,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "../styles/SurveyDesign.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ExclamationCircleOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import addrImage from "../resources/question_images/addr.png";
import emailImage from "../resources/question_images/email.png";
import gridImage from "../resources/question_images/grid.png";
import linearImage from "../resources/question_images/linear.png";
import longImage from "../resources/question_images/long.png";
import multImage from "../resources/question_images/mult.png";
import oneImage from "../resources/question_images/one.png";
import phoneImage from "../resources/question_images/phone.png";
import shortImage from "../resources/question_images/short.png";
import { EditQuestion } from "../modules";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { findTemplateByIdQuery } from "../API/findTemplateByIdQuery";
import { findFormByIdQuery } from "../API/findFormByIdQuery";

const CREATE_FORM_MUTATION = gql`
  mutation createForm($request: CreateFormInput!) {
    createForm(input: $request) {
      ok
      error
      formId
    }
  }
`;

const EDIT_FORM_MUTATION = gql`
  mutation editForm($request: EditFormInput!) {
    editForm(input: $request) {
      ok
      error
    }
  }
`;

function parseClosedQuestion(ques) {
  return {
    ...ques,
    type: "closed",
    allowMultiple: ques.closedType === "One" ? false : true,
    choices: ques.choices.map((ch, i) => {
      return {
        content: ch.choice,
        trigger: ch.activatedSection ? Number(ch.activatedSection) : -1,
        key: `${ques._id}-${i}`,
      };
    }),
  };
}

function parseOpenedQuestion(ques) {
  if (ques.openedType === "Default") {
    return {
      ...ques,
      type: "opened",
      allowMultiple: true,
    };
  } else if (ques.openedType === "Date") {
    return {
      ...ques,
      type: "date",
    };
  } else if (ques.openedType === "Time") {
    return {
      ...ques,
      type: "date",
    };
  } else if (ques.openedType === "Address") {
    return {
      ...ques,
      type: "address",
    };
  } else {
    console.log("not implemented");
    return null;
  }
}

function parseGridQuestion(ques) {
  return {
    ...ques,
    type: "grid",
  };
}

function parsePersonalQuestion(ques) {
  if (ques.personalType === "Phone") {
    return {
      ...ques,
      type: "phone",
    };
  } else if (ques.personalType === "Address") {
    return {
      ...ques,
      type: "address",
    };
  } else {
    return {
      ...ques,
      type: "email",
    };
  }
}

function parseLinearQuestion(ques) {
  return {
    ...ques,
    type: "linear",
  };
}

function SurveyDesign() {
  const [findTemplateById] = useLazyQuery(findTemplateByIdQuery);
  const [findFormById] = useLazyQuery(findFormByIdQuery);
  const [createForm] = useMutation(CREATE_FORM_MUTATION);
  const [editForm] = useMutation(EDIT_FORM_MUTATION);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [rawForm, setRawForm] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("Ready");
  const [isPromoted, setIsPromoted] = useState(false);
  const [expiredAt, setExpiredAt] = useState(moment());
  const [privacyExpiredAt, setPrivacyExpiredAt] = useState(moment());

  const [sections, setSections] = useState(null);
  const [lastFocused, setLastFocused] = useState(undefined);

  function generateEmptySection(order) {
    return {
      title: "새 섹션",
      order: order,
      questions: [],
    };
  }

  async function fetchFormData(id) {
    try {
      const res = await findFormById({
        variables: {
          formId: id,
        },
      });
      const currForm = res.data.findFormById.form;

      setRawForm(currForm);
      setTitle(currForm.title);
      setDescription(currForm.description);
      setState(currForm.state);
      setIsPromoted(currForm.isPromoted);
      setExpiredAt(moment(currForm.expiredAt));
      setPrivacyExpiredAt(moment(currForm.privacyExpiredAt));

      let rawSections = currForm.sections;
      if (rawSections.length === 0) {
        // 기본 섹션을 추가.
        rawSections = [generateEmptySection(0)];
      }
      let processed = rawSections.map((sect) => {
        return {
          ...sect,
          questions: sect.questions.map((ques) => {
            if (ques.__typename === "ClosedQuestion") {
              return parseClosedQuestion(ques);
            } else if (ques.__typename === "OpenedQuestion") {
              return parseOpenedQuestion(ques);
            } else if (ques.__typename === "GridQuestion") {
              return parseGridQuestion(ques);
            } else if (ques.__typename === "PersonalQuestion") {
              return parsePersonalQuestion(ques);
            } else if (ques.__typename === "LinearQuestion") {
              return parseLinearQuestion(ques);
            }
          }),
        };
      });
      setSections(processed);
    } catch (err) {
      console.log(JSON.stringify(err));
      alert(`설문 데이터를 불러오는데 실패하였습니다. ${err}`);
      navigate("/my-survey");
    }
  }

  function generateInputFromTemplate(currTemp) {
    const metaKeys = ["_id", "__typename"];

    const removeMeta = (node) => {
      for (const key in node) {
        if (metaKeys.includes(key)) {
          delete node[key];
        } else if (typeof node[key] === "object") {
          removeMeta(node[key]);
        }
      }
      return node;
    };

    const processSection = (sec) => {
      return {
        title: sec.title ? sec.title : "",
        order: sec.order,
        opened: sec.questions
          .filter((ques) => ques.kind === "Opened")
          .map((ques) => removeMeta(ques)),
        closed: sec.questions
          .filter((ques) => ques.kind === "Closed")
          .map((ques) => removeMeta(ques)),
        grid: sec.questions
          .filter((ques) => ques.kind === "Grid")
          .map((ques) => removeMeta(ques)),
        personal: sec.questions
          .filter((ques) => ques.kind === "Personal")
          .map((ques) => removeMeta(ques)),
        linear: sec.questions
          .filter((ques) => ques.kind === "Linear")
          .map((ques) => removeMeta(ques)),
      };
    };
    return {
      title: currTemp.title ? currTemp.title : "",
      description: currTemp.description ? currTemp.description : "",
      state: "Ready",
      expiredAt: moment().add(1, "months").toDate(),
      privacyExpiredAt: moment().add(1, "years").toDate(),
      sections: currTemp.sections.map((sec) => processSection(sec)),
    };
  }

  async function handleTemplate(id) {
    let currTemp;
    try {
      const res = await findTemplateById({
        variables: {
          templateId: id,
        },
      });
      currTemp = res.data.findTemplateById.template;
    } catch (err) {
      alert(`템플릿 데이터를 불러오는데 실패하였습니다. ${err}`);
      navigate("/my-survey");
    }

    try {
      const createInput = generateInputFromTemplate(currTemp);
      const createRes = await createForm({
        variables: {
          request: createInput,
        },
      });
      const formIdRes = createRes.data.createForm.formId;
      setSearchParams({ id: formIdRes });
    } catch (err) {
      console.log(JSON.stringify(err));
      alert(`새 설문지를 생성하는데 실패하였습니다. ${err}`);
      navigate("/my-survey");
    }
  }

  async function handleReuse(id) {
    let currTemp;
    try {
      const res = await findFormById({
        variables: {
          formId: id,
        },
      });
      currTemp = res.data.findFormById.form;
    } catch (err) {
      console.log(JSON.stringify(err));
      alert(`기존의 설문 데이터를 불러오는데 실패하였습니다. ${err}`);
      navigate("/my-survey");
    }

    try {
      const createInput = generateInputFromTemplate(currTemp);
      console.log(createInput);
      const createRes = await createForm({
        variables: {
          request: createInput,
        },
      });
      const formIdRes = createRes.data.createForm.formId;
      setSearchParams({ id: formIdRes });
    } catch (err) {
      console.log(JSON.stringify(err));
      alert(`새 설문지를 생성하는데 실패하였습니다. ${err}`);
      navigate("/my-survey");
    }
  }

  useEffect(() => {
    if (searchParams.get("temp")) {
      handleTemplate(searchParams.get("temp"));
    } else if (searchParams.get("reuse")) {
      handleReuse(searchParams.get("reuse"));
    } else if (searchParams.get("id")) {
      fetchFormData(searchParams.get("id"));
    } else {
      alert("올바르지 않은 접근입니다.");
      navigate("/my-survey");
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

  async function save() {
    if (!rawForm || rawForm.state !== "Ready") {
      return true;
    }
    try {
      let newForm = {
        formId: rawForm._id,
        title: title,
        description: description,
        state: state,
        isPromoted: isPromoted,
        expiredAt: expiredAt.toDate(),
        privacyExpiredAt: privacyExpiredAt.toDate(),
        representativeQuestionId: null,
        sections: sections.map((sect, i) => {
          let opened = [],
            closed = [],
            grid = [],
            personal = [],
            linear = [];

          sect.questions.forEach((ques, j) => {
            if (ques.type === "closed") {
              closed.push({
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Closed",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
                closedType: ques.allowMultiple ? "Multiple" : "One",
                choices: ques.choices.map((ch, k) => {
                  return {
                    no: k,
                    choice: ch.content,
                    activatedSection:
                      ch.trigger === -1 || sections.length <= ch.trigger
                        ? null
                        : String(ch.trigger),
                  };
                }),
              });
            }

            if (ques.type === "opened") {
              opened.push({
                openedType: "Default",
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Opened",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
                attachment: "",
              });
            }

            if (ques.type === "linear") {
              linear.push({
                leftRange: ques.leftRange,
                rightRange: ques.rightRange,
                leftLabel: ques.leftLabel,
                rightLabel: ques.rightLabel,
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Linear",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
              });
            }

            if (ques.type === "grid") {
              grid.push({
                colContent: ques.colContent,
                rowContent: ques.rowContent,
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Grid",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
              });
            }

            if (ques.type === "phone") {
              personal.push({
                personalType: "Phone",
                encoded: true,
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Personal",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
              });
            }

            if (ques.type === "email") {
              personal.push({
                personalType: "Email",
                encoded: true,
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Personal",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
              });
            }

            if (ques.type === "date") {
              opened.push({
                openedType: "Date",
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Opened",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
                attachment: "",
              });
            }

            if (ques.type === "address") {
              opened.push({
                openedType: "Address",
                order: j,
                required: ques.required,
                description: ques.description,
                kind: "Opened",
                content: ques.content
                  ? ques.content
                  : "(문항 제목이 없습니다.)",
                attachment: "",
              });
            }
          });

          return {
            title: sect.title,
            order: i,
            opened: opened,
            closed: closed,
            grid: grid,
            personal: personal,
            linear: linear,
          };
        }),
      };

      await editForm({
        variables: {
          request: newForm,
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err));
      return false;
    }
    return true;
  }

  async function saveWorks() {
    if (await save()) {
      message.success("작업 내역을 저장하였습니다.");
    } else {
      message.error("작업 내역을 저장하지 못했습니다.");
    }
  }

  async function saveAndExit() {
    if (await save()) {
      Modal.confirm({
        title: "'내 설문'으로 나갈까요?",
        icon: <ExclamationCircleOutlined />,
        content: "지금까지의 작업은 저장되었습니다.",
        onOk() {
          navigate("/my-survey");
        },
        onCancel() {},
      });
    } else {
      Modal.confirm({
        title: "'내 설문'으로 나갈까요?",
        icon: <ExclamationCircleOutlined />,
        content: "작업 내역이 저장되지 않았습니다.",
        onOk() {
          navigate("/my-survey");
        },
        onCancel() {},
      });
    }
  }

  const moveSectionDown = (secIndex) => () => {
    if (secIndex === sections.length - 1) {
      message.error("마지막 섹션은 더 아래로 옮길 수 없습니다.");
      return;
    }
    const newSections = [...sections];
    [newSections[secIndex], newSections[secIndex + 1]] = [
      newSections[secIndex + 1],
      newSections[secIndex],
    ];
    setSections(newSections);
  };

  const moveSectionUp = (secIndex) => () => {
    if (secIndex === 0) {
      message.error("첫 번째 섹션은 더 위로 옮길 수 없습니다.");
      return;
    }
    const newSections = [...sections];
    [newSections[secIndex - 1], newSections[secIndex]] = [
      newSections[secIndex],
      newSections[secIndex - 1],
    ];
    setSections(newSections);
  };

  const removeSection = (secIndex) => () => {
    if (secIndex === 0) {
      message.error("유일한 섹션은 삭제할 수 없습니다.");
      return;
    }
    const newSections = [...sections];
    newSections.splice(secIndex, 1);
    setSections(newSections);
  };

  const addSectionBefore = (secIndex) => () => {
    const newSections = [...sections];
    newSections.splice(secIndex, 0, generateEmptySection(0));
    newSections.forEach((_, i) => {
      newSections[i].order = i;
    });
    setSections(newSections);
  };

  const addSectionAfter = (secIndex) => () => {
    const newSections = [...sections];
    newSections.splice(secIndex + 1, 0, generateEmptySection(0));
    newSections.forEach((_, i) => {
      newSections[i].order = i;
    });
    setSections(newSections);
  };

  function changeState(e) {
    const newState = e.target.value;
    if (newState === "InProgress") {
      Modal.confirm({
        title: "정말 설문을 공개할까요?",
        icon: <ExclamationCircleOutlined />,
        content: (
          <div className="design-modal-layout">
            <ul>
              <li>공개 후에는 더 이상 설문을 수정할 수 없습니다.</li>
              <li>
                <strong>
                  {expiredAt.format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
                </strong>{" "}
                까지 응답을 받습니다.
              </li>
              <li>
                <strong>
                  {privacyExpiredAt.format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
                </strong>{" "}
                에 연락처 응답은 파기되어, 그 이후 피조사자에게 연락할 수
                없습니다.
              </li>
            </ul>
          </div>
        ),
        okText: "예",
        okType: "danger",
        cancelText: "취소",
        onOk: () => setState(newState),
        onCancel: () => {},
        width: 700,
        centered: true,
      });
    } else if (newState === "Expired") {
      Modal.confirm({
        title: "정말 설문을 마감할까요?",
        icon: <ExclamationCircleOutlined />,
        content: (
          <div className="design-modal-layout">
            <ul>
              <li>
                설문에 대한 응답을 받지 않으며, 설문지를 수정하는 것도
                불가능합니다.
              </li>
              <li>필요시, 설문을 다시 공개할 수 있습니다.</li>
              <li>
                <strong>
                  {privacyExpiredAt.format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
                </strong>{" "}
                에 연락처 응답은 파기되어, 그 이후 피조사자에게 연락할 수
                없습니다.
              </li>
            </ul>
          </div>
        ),
        okText: "예",
        okType: "danger",
        cancelText: "취소",
        onOk: () => setState(newState),
        onCancel: () => {},
        width: 700,
        centered: true,
      });
    }
  }

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
                    onClick={
                      state === "Ready" ? addQuestion(ques.init) : undefined
                    }
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
              설문제목 - {title}
            </Typography.Title>
          </div>
          <div className="design-preview-btngroup">
            <button className="design-button" onClick={saveWorks}>
              저장
            </button>
            <button className="design-button" onClick={saveAndExit}>
              완료
            </button>
          </div>
        </div>
        <div className="design-preview-body">
          {sections ? (
            sections.map((sect, i) => (
              <div className="design-section" key={sect._id}>
                <Divider>
                  <Input.Group compact onFocus={() => setLastFocused([i, -1])}>
                    <Input
                      className="design-section-title"
                      addonBefore={`${i + 1}번째 섹션 제목`}
                      value={sect.title}
                      onChange={updateSectionTitleChange(i)}
                      disabled={state !== "Ready"}
                    ></Input>
                    <Tooltip title="섹션을 아래로 옮기기">
                      <Button
                        icon={<CaretDownOutlined />}
                        onClick={moveSectionDown(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="섹션을 위로 옮기기">
                      <Button
                        icon={<CaretUpOutlined />}
                        onClick={moveSectionUp(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="이 섹션 제거">
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={removeSection(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="이 섹션 위에 새 섹션 추가">
                      <Button
                        icon={<PlusSquareOutlined />}
                        onClick={addSectionBefore(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                  </Input.Group>
                </Divider>

                {sect.questions.length === 0 ? (
                  <Empty description="왼쪽 팔레트에서 문항을 추가해보세요!"></Empty>
                ) : (
                  sect.questions.map((ques, j) => (
                    <EditQuestion
                      onFocus={() => {
                        setLastFocused([i, j]);
                      }}
                      onRemove={removeQuestion(i, j)}
                      key={ques._id}
                      sectionCount={sections.length}
                      data={ques}
                      onDataChange={updateQuestionData(i, j)}
                      disabled={state !== "Ready"}
                    ></EditQuestion>
                  ))
                )}

                <Divider>
                  <Input.Group compact>
                    <Input
                      className="design-section-title"
                      addonBefore={`${i + 1}번째 섹션 제목`}
                      value={sect.title}
                      onChange={updateSectionTitleChange(i)}
                      disabled={state !== "Ready"}
                    ></Input>
                    <Tooltip title="섹션을 아래로 옮기기">
                      <Button
                        icon={<CaretDownOutlined />}
                        onClick={moveSectionDown(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="섹션을 위로 옮기기">
                      <Button
                        icon={<CaretUpOutlined />}
                        onClick={moveSectionUp(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="이 섹션 제거">
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={removeSection(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="이 섹션 아래에 새 섹션 추가">
                      <Button
                        icon={<PlusSquareOutlined />}
                        onClick={addSectionAfter(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                  </Input.Group>
                </Divider>
              </div>
            ))
          ) : (
            <div className="design-preview-spin">
              <Spin tip="설문지를 준비하는 중입니다!"></Spin>
            </div>
          )}
        </div>
      </div>
      <div className="design-info">
        <Typography.Title level={5} className="design-title">
          설문 정보 편집
        </Typography.Title>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            설문 참여 주소
          </Typography.Title>
          {searchParams.get("id") ? (
            <Typography.Paragraph copyable>{`${
              window.location.host
            }/respond?id=${searchParams.get("id")}`}</Typography.Paragraph>
          ) : (
            <Typography>설문을 저장하면 응답 주소가 생성됩니다.</Typography>
          )}
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            제목
          </Typography.Title>
          <Input
            placeholder="설문 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            disabled={state !== "Ready"}
          ></Input>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            설명
          </Typography.Title>
          <Input.TextArea
            rows={2}
            placeholder="설문 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={state !== "Ready"}
          ></Input.TextArea>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            응답 마감 시간
          </Typography.Title>
          <DatePicker
            value={expiredAt}
            showTime
            placeholder="응답 마감 시간"
            onChange={(date) => setExpiredAt(date)}
            disabled={state !== "Ready"}
          ></DatePicker>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            개인정보 파기 시간
          </Typography.Title>
          <DatePicker
            value={privacyExpiredAt}
            showTime
            placeholder="개인정보 파기 시간"
            onChange={(date) => setPrivacyExpiredAt(date)}
            disabled={state !== "Ready"}
          ></DatePicker>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            설문 상태
          </Typography.Title>
          <Radio.Group value={state} buttonStyle="solid" onChange={changeState}>
            <Radio.Button value="Ready" disabled={state !== "Ready"}>
              준비 중
            </Radio.Button>
            <Radio.Button value="InProgress">공개됨</Radio.Button>
            <Radio.Button value="Expired">종료됨</Radio.Button>
          </Radio.Group>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            배너 광고 등록
          </Typography.Title>
          <div className="design-switch-layout">
            <span>메인 페이지에 설문을 노출하기</span>
            <Switch
              value={isPromoted}
              onChange={(value) => setIsPromoted(value)}
              disabled={state !== "Ready"}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyDesign;
