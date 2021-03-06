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
import { findTemplateByIdQuery, findFormByIdQuery } from "../API";

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
      title: "??? ??????",
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
        // ?????? ????????? ??????.
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
      alert(`?????? ???????????? ??????????????? ?????????????????????. ${err}`);
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
      alert(`????????? ???????????? ??????????????? ?????????????????????. ${err}`);
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
      alert(`??? ???????????? ??????????????? ?????????????????????. ${err}`);
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
      alert(`????????? ?????? ???????????? ??????????????? ?????????????????????. ${err}`);
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
      alert(`??? ???????????? ??????????????? ?????????????????????. ${err}`);
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
      alert("???????????? ?????? ???????????????.");
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
      subtitle: "????????? ??????",
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
      subtitle: "????????? ??????",
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
      subtitle: "?????? ????????? ??????",
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
              leftLabel: "??????",
              rightRange: 10,
              rightLabel: "??????",
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
              rowContent: ["??? 1", "??? 2"],
              colContent: ["??? 1", "??? 2"],
            };
          },
        },
      ],
    },
    {
      key: "private",
      subtitle: "???????????? ??????",
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
    if (!rawForm) {
      return true;
    } else if (rawForm.state !== "Ready") {
      try {
        let newForm = {
          formId: rawForm._id,
          isPromoted: isPromoted,
        };
        console.log(JSON.stringify(newForm));
        await editForm({
          variables: {
            request: newForm,
          },
        });
      } catch (err) {
        console.log(JSON.stringify(err));
        return false;
      }
    } else {
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
                    : "(?????? ????????? ????????????.)",
                  closedType: ques.allowMultiple ? "Multiple" : "One",
                  choices: ques.choices.map((ch, k) => {
                    return {
                      no: k,
                      choice: ch.content,
                      activatedSection:
                        ch.trigger === -1 || sections.length <= ch.trigger
                          ? null
                          : ch.trigger,
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
                    : "(?????? ????????? ????????????.)",
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
                    : "(?????? ????????? ????????????.)",
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
                    : "(?????? ????????? ????????????.)",
                });
              }

              if (ques.type === "phone") {
                personal.push({
                  personalType: "Phone",
                  order: j,
                  required: ques.required,
                  description: ques.description,
                  kind: "Personal",
                  content: ques.content
                    ? ques.content
                    : "(?????? ????????? ????????????.)",
                });
              }

              if (ques.type === "email") {
                personal.push({
                  personalType: "Email",
                  order: j,
                  required: ques.required,
                  description: ques.description,
                  kind: "Personal",
                  content: ques.content
                    ? ques.content
                    : "(?????? ????????? ????????????.)",
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
                    : "(?????? ????????? ????????????.)",
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
                    : "(?????? ????????? ????????????.)",
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
    }
    return true;
  }

  async function saveWorks() {
    if (await save()) {
      message.success("?????? ????????? ?????????????????????.");
    } else {
      message.error("?????? ????????? ???????????? ???????????????.");
    }
  }

  async function saveAndExit() {
    if (await save()) {
      Modal.confirm({
        title: "'??? ??????'?????? ?????????????",
        icon: <ExclamationCircleOutlined />,
        content: "??????????????? ????????? ?????????????????????.",
        onOk() {
          navigate("/my-survey");
        },
        onCancel() {},
      });
    } else {
      Modal.confirm({
        title: "'??? ??????'?????? ?????????????",
        icon: <ExclamationCircleOutlined />,
        content: "?????? ????????? ???????????? ???????????????.",
        onOk() {
          navigate("/my-survey");
        },
        onCancel() {},
      });
    }
  }

  const moveSectionDown = (secIndex) => () => {
    if (secIndex === sections.length - 1) {
      message.error("????????? ????????? ??? ????????? ?????? ??? ????????????.");
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
      message.error("??? ?????? ????????? ??? ?????? ?????? ??? ????????????.");
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
      message.error("????????? ????????? ????????? ??? ????????????.");
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
        title: "?????? ????????? ????????????????",
        icon: <ExclamationCircleOutlined />,
        content: (
          <div className="design-modal-layout">
            <ul>
              <li>?????? ????????? ??? ?????? ????????? ????????? ??? ????????????.</li>
              <li>
                <strong>
                  {expiredAt.format("YYYY??? MM??? DD??? HH??? mm??? ss???")}
                </strong>{" "}
                ?????? ????????? ????????????.
              </li>
              <li>
                <strong>
                  {privacyExpiredAt.format("YYYY??? MM??? DD??? HH??? mm??? ss???")}
                </strong>{" "}
                ??? ????????? ????????? ????????????, ??? ?????? ?????????????????? ????????? ???
                ????????????.
              </li>
            </ul>
          </div>
        ),
        okText: "???",
        okType: "danger",
        cancelText: "??????",
        onOk: () => setState(newState),
        onCancel: () => {},
        width: 700,
        centered: true,
      });
    } else if (newState === "Expired") {
      Modal.confirm({
        title: "?????? ????????? ????????????????",
        icon: <ExclamationCircleOutlined />,
        content: (
          <div className="design-modal-layout">
            <ul>
              <li>
                ????????? ?????? ????????? ?????? ?????????, ???????????? ???????????? ??????
                ??????????????????.
              </li>
              <li>?????????, ????????? ?????? ????????? ??? ????????????.</li>
              <li>
                <strong>
                  {privacyExpiredAt.format("YYYY??? MM??? DD??? HH??? mm??? ss???")}
                </strong>{" "}
                ??? ????????? ????????? ????????????, ??? ?????? ?????????????????? ????????? ???
                ????????????.
              </li>
            </ul>
          </div>
        ),
        okText: "???",
        okType: "danger",
        cancelText: "??????",
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
          ?????? ?????????
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
              ???????????? - {title}
            </Typography.Title>
          </div>
          <div className="design-preview-btngroup">
            <button className="design-button" onClick={saveWorks}>
              ??????
            </button>
            <button className="design-button" onClick={saveAndExit}>
              ??????
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
                      addonBefore={`${i + 1}?????? ?????? ??????`}
                      value={sect.title}
                      onChange={updateSectionTitleChange(i)}
                      disabled={state !== "Ready"}
                    ></Input>
                    <Tooltip title="????????? ????????? ?????????">
                      <Button
                        icon={<CaretDownOutlined />}
                        onClick={moveSectionDown(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="????????? ?????? ?????????">
                      <Button
                        icon={<CaretUpOutlined />}
                        onClick={moveSectionUp(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="??? ?????? ??????">
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={removeSection(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="??? ?????? ?????? ??? ?????? ??????">
                      <Button
                        icon={<PlusSquareOutlined />}
                        onClick={addSectionBefore(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                  </Input.Group>
                </Divider>

                {sect.questions.length === 0 ? (
                  <Empty description="?????? ??????????????? ????????? ??????????????????!"></Empty>
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
                      addonBefore={`${i + 1}?????? ?????? ??????`}
                      value={sect.title}
                      onChange={updateSectionTitleChange(i)}
                      disabled={state !== "Ready"}
                    ></Input>
                    <Tooltip title="????????? ????????? ?????????">
                      <Button
                        icon={<CaretDownOutlined />}
                        onClick={moveSectionDown(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="????????? ?????? ?????????">
                      <Button
                        icon={<CaretUpOutlined />}
                        onClick={moveSectionUp(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="??? ?????? ??????">
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={removeSection(i)}
                        disabled={state !== "Ready"}
                      />
                    </Tooltip>
                    <Tooltip title="??? ?????? ????????? ??? ?????? ??????">
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
              <Spin tip="???????????? ???????????? ????????????!"></Spin>
            </div>
          )}
        </div>
      </div>
      <div className="design-info">
        <Typography.Title level={5} className="design-title">
          ?????? ?????? ??????
        </Typography.Title>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ?????? ?????? ??????
          </Typography.Title>
          {searchParams.get("id") ? (
            <Typography.Paragraph copyable>{`${
              window.location.host
            }/respond?id=${searchParams.get("id")}`}</Typography.Paragraph>
          ) : (
            <Typography>????????? ???????????? ?????? ????????? ???????????????.</Typography>
          )}
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ??????
          </Typography.Title>
          <Input
            placeholder="?????? ??????"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            disabled={state !== "Ready"}
          ></Input>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ??????
          </Typography.Title>
          <Input.TextArea
            rows={2}
            placeholder="?????? ??????"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={state !== "Ready"}
          ></Input.TextArea>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ?????? ?????? ??????
          </Typography.Title>
          <DatePicker
            value={expiredAt}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder="?????? ?????? ??????"
            onChange={(date) => setExpiredAt(date)}
            disabled={state !== "Ready"}
          ></DatePicker>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ???????????? ?????? ??????
          </Typography.Title>
          <DatePicker
            value={privacyExpiredAt}
            placeholder="???????????? ?????? ??????"
            onChange={(date) => setPrivacyExpiredAt(date)}
            disabled={state !== "Ready"}
          ></DatePicker>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ?????? ??????
          </Typography.Title>
          <Radio.Group value={state} buttonStyle="solid" onChange={changeState}>
            <Radio.Button value="Ready" disabled={state !== "Ready"}>
              ?????? ???
            </Radio.Button>
            <Radio.Button value="InProgress">?????????</Radio.Button>
            <Radio.Button value="Expired">?????????</Radio.Button>
          </Radio.Group>
        </div>
        <div className="design-inner-info">
          <Typography.Title level={5} className="design-subtitle">
            ?????? ?????? ??????
          </Typography.Title>
          <div className="design-switch-layout">
            <span>?????? ???????????? ????????? ????????????</span>
            <Switch
              checked={isPromoted}
              onChange={(value) => setIsPromoted(value)}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyDesign;
