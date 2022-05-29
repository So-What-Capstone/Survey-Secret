import { Divider, Typography, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import "../styles/SurveyDesign.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
import { gql, useMutation, useQuery } from "@apollo/client";
import { findTemplateByIdQuery } from "../API/findTemplateByIdQuery";

const formId = "62790a9fa2b013e1c29571d7";
const templateId = "62836d7185ffb60503c4fad6";

const FIND_TEMPLATE_BY_ID_QUERY = findTemplateByIdQuery;

const FIND_FORM_BY_ID_QUERY = gql`
  query findFormById($formId: String!) {
    findFormById(input: { formId: $formId }) {
      ok
      error
      form {
        _id
        title
        state
        createdAt
        sections {
          _id
          title
          order
          questions {
            ... on ClosedQuestion {
              _id
              content
              description
              required
              kind
              closedType
              choices {
                no
                choice
                activatedSection
              }
            }
            ... on OpenedQuestion {
              _id
              content
              description
              required
              kind
              openedType
            }
            ... on LinearQuestion {
              _id
              content
              description
              required
              kind
              leftRange
              rightRange
              leftLabel
              rightLabel
            }
            ... on GridQuestion {
              _id
              content
              description
              required
              kind
              gridType
            }
            ... on PersonalQuestion {
              _id
              content
              description
              required
              kind
            }
          }
        }
      }
    }
  }
`;

const CREATE_FORM_MUTATION = gql`
  mutation createForm($request: CreateFormInput!) {
    createForm(input: $request) {
      ok
      error
    }
  }
`;

const DELETE_FORM_MUTATION = gql`
  mutation deleteForm($formId: String!) {
    deleteForm(input: { formId: $formId }) {
      ok
      error
    }
  }
`;

function parseClosedQuestion(sections, ques) {
  return {
    ...ques,
    type: "closed",
    allowMultiple: ques.closedType === "One" ? false : true,
    choices: ques.choices.map((ch) => {
      return {
        content: ch.choice,
        trigger: ch.activatedSection ? ch.activatedSection : -1,
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
  if (ques.type === "Phone") {
    return {
      ...ques,
      type: "phone",
    };
  } else if (ques.type === "Address") {
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
  const {
    loading: findTemplateLoading,
    data: findTemplateData,
    error: findTemplateError,
  } = useQuery(FIND_TEMPLATE_BY_ID_QUERY, {
    variables: { templateId },
    onCompleted: (data) => {
      console.log("find Template completed");
      console.log(data);
    },
  });

  const [createForm, { loading: mutationLoading }] = useMutation(
    CREATE_FORM_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createForm: { ok, error },
        } = data;
        if (!ok) {
          console.log("OK IS FALSE");
          console.log(error);
          throw new Error(error);
        }
        console.log(data);
      },
      onError: (error) => {
        console.log("ONERROR");
        console.log(error.clientErrors);
        console.log(error.extraInfo);
        console.log(error.graphQLErrors);
        console.log(error.message);
        console.log(error.name);
      },
    }
  );
  const [deleteForm, { loading: deleteLoading }] = useMutation(
    DELETE_FORM_MUTATION,
    {
      onCompleted: (data) => {
        const {
          deleteForm: { ok, error },
        } = data;
        if (!ok) {
          throw new Error(error);
        }
        console.log("Delete Complete");
      },
    }
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [rawForm, setRawForm] = useState();
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [lastFocused, setLastFocused] = useState(undefined);

  const { loading, data, error } = useQuery(FIND_FORM_BY_ID_QUERY, {
    variables: { formId: searchParams.get("id") },
    onCompleted: (data) => {
      setTitle(data.findFormById.form.title);
      setRawForm(data.findFormById.form);
      const rawSections = data.findFormById.form.sections;
      let processed = rawSections.map((sect) => {
        return {
          ...sect,
          questions: sect.questions.map((ques) => {
            if (ques.__typename === "ClosedQuestion") {
              return parseClosedQuestion(rawSections, ques);
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
    },
  });

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

  function save() {
    let newForm = {
      title: title,
      state: "InProgress",
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
              content: ques.content,
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
              content: ques.content,
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
              content: ques.content,
            });
          }

          if (ques.type === "grid") {
            grid.push({
              gridType: "One",
              colContent: ques.colContent,
              rowContent: ques.rowContent,
              order: j,
              required: ques.required,
              description: ques.description,
              kind: "Grid",
              content: ques.content,
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
              content: ques.content,
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
              content: ques.content,
            });
          }

          if (ques.type === "date") {
            opened.push({
              openedType: "Date",
              order: j,
              required: ques.required,
              description: ques.description,
              kind: "Opened",
              content: ques.content,
            });
          }

          if (ques.type === "address") {
            opened.push({
              openedType: "Address",
              order: j,
              required: ques.required,
              description: ques.description,
              kind: "Opened",
              content: ques.content,
            });
          }
        });

        return {
          order: i,
          opened: opened,
          closed: closed,
          grid: grid,
          personal: personal,
          linear: linear,
        };
      }),
    };

    console.log(newForm);
    console.log(rawForm);
    deleteForm({
      variables: {
        formId: rawForm._id,
      },
    });

    // 현재 newForm에 모두 들어있음.
    createForm({
      variables: {
        request: newForm,
      },
    });
  }

  function saveWorks() {
    save();
    message.success("작업 내역을 저장하였습니다.");
  }

  function saveAndExit() {
    save();
    Modal.confirm({
      title: "'내 설문'으로 나갈까요?",
      icon: <ExclamationCircleOutlined />,
      content: "지금까지의 작업은 저장되었습니다.",
      onOk() {
        navigate("/my-survey");
      },
      onCancel() {},
    });
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
                    onClick={addQuestion(ques.init)}
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
          {sections.map((sect, i) => (
            <div className="design-section" key={sect._id}>
              <Divider>
                <Input
                  className="design-section-title"
                  addonBefore={`${i + 1}번째 섹션 제목`}
                  value={sect.title}
                  onChange={updateSectionTitleChange(i)}
                ></Input>
              </Divider>

              {sect.questions.map((ques, j) => (
                <EditQuestion
                  onFocus={() => {
                    setLastFocused([i, j]);
                  }}
                  onRemove={removeQuestion(i, j)}
                  key={ques._id}
                  sectionCount={sections.length}
                  data={ques}
                  onDataChange={updateQuestionData(i, j)}
                ></EditQuestion>
              ))}
              <Divider>{`${i + 1}번째 섹션 끝`}</Divider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyDesign;
