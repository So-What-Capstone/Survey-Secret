import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createAccountQuery } from "../API/createAccountQuery";
import { QType } from "../modules";
import Form from "../modules/Form";
import {
  FIND_FORM_BY_ID_QUERY,
  getFormConfigFromDB,
  getQuestionKind,
} from "../modules/FormConfig";
import "../styles/Respond.css";

const CREATE_SUBMISSION_MUTATION = createAccountQuery;

function FormRespToSubm(form_config, response) {
  /*
  result shape:
  let submission = {
    variables: {
      request: {
        formId: form_config.id,
        sections: [{sectionId: string, answers:{
          Opend:[{
            openedAnswer: String,
            question: String!,
            kind: QuestionType!
          }],
          Closed:[{
            closedAnswer: [Float!]!,
            question: String!,
            kind: QuestionType!,
          }],
          Linear:[{
            linearAnswer: Float!,
            question: String!,
            kind: QuestionType!
          }],
          Grid:[{
            gridAnswer: [{
              rowNo:Float!,
              colNo:Float!,
            }!],
            question: String!,
            kind: QuestionType!
          }],
          Personal:[{
            question: String!,
            kind: QuestionType!,
            personalAnswer: String
          }]
        }}],
      },
    },
  };
  */
  // make submission shape for the mutation
  let sub_secs = new Array(form_config.sections.length);
  for (let i = 0; i < sub_secs.length; i++) {
    let sec = form_config.sections[i];
    sub_secs[i] = { sectionId: sec.id, answers: [] };

    let answers = {
      Closed: [],
      Opened: [],
      Linear: [],
      Grid: [],
      Personal: [],
    };

    for (let j = 0; j < sec.questions.length; j++) {
      let q = sec.questions[j];
      const type = q.type;
      const kind = getQuestionKind(q.type);

      let ansDic = { kind: kind, question: q.id };
      let qVal = response[q.id];
      if (QType.CLOSED_ONE <= type && type <= QType.CLOSED_INPUT) {
        //closed
        ansDic["closedAnswer"] = qVal.data;
      } else if (type === QType.LINEAR) {
        // linear
        ansDic["linearAnswer"] = qVal.data;
      } else if (type === QType.OPENED) {
        // Opened
        ansDic["openedAnswer"] = qVal.data;
      } else if (type === QType.PHONE) {
        // phone
        ansDic["personalAnswer"] = qVal.data;
      } else if (type === QType.GRID) {
        // grid
        ansDic["gridAnswer"] = qVal.data
          .map((v, i) =>
            0 <= v
              ? {
                  rowNo: i,
                  colNo: Number(v),
                }
              : null
          )
          .filter((v) => v !== null);
        console.log("grid answer: ", ansDic);
      } else if (type === QType.EMAIL) {
        // email
        ansDic["personalAnswer"] = qVal.id + qVal.domain;
      } else if (type === QType.DATE) {
        // date
        ansDic["opendAnswer"] = qVal.date_str;
      } else if (type === QType.ADDRESS) {
        // address
        ansDic["personalAnswer"] = String(
          qVal.zip_code + qVal.address + qVal.address_detail
        );
      }

      answers[kind].push(ansDic);
    }
    sub_secs[i]["answers"] = [answers];
  }
  let submission = {
    variables: {
      request: {
        formId: form_config.id,
        sections: sub_secs,
      },
    },
  };

  return submission;
}

function Respond() {
  const [form_config, setFormConfig] = useState();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(0);
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);
  const { loading, data, error } = useQuery(FIND_FORM_BY_ID_QUERY, {
    variables: { formId },
    onCompleted: (data) => {
      const config = getFormConfigFromDB(
        formId,
        data.findFormById.form,
        data.findFormById.form.sections
      );
      setFormConfig(config);
    },
  });

  const [createSubmission, { loading: mutationLoading }] = useMutation(
    CREATE_SUBMISSION_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createSubmission: { ok, error },
        } = data;
        if (!ok) {
          throw new Error(error);
        } else {
          alert("제출되었습니다.");
          navigate("/");
        }
      },
    }
  );

  const navigate = useNavigate();
  const [response, setResponse] = useState();

  const onSubmitClick = () => {
    // submit the response

    // check the validity of response
    // let isValid = true;
    // for (const idx in response) {
    //   if (!response[idx].isValid) {
    //     isValid = false;
    //     break;
    //   }
    // }
    // make submission shape for the mutation
    let submission = FormRespToSubm(form_config, response);

    //response => Submission.
    createSubmission(submission);

    console.log("submission", submission);
    // if (isValid) {
    //   alert("제출되었습니다.");
    // } else {
    //   alert("필수 응답문항을 모두 답해 주세요.");
    // }
  };

  if (!form_config) return null;
  return (
    <div className="respond-container">
      <div className="preview">
        <Form _config={form_config} _setResponse={setResponse} />
        <div className="respond-submit-container">
          <button className="respond-submit-btn" onClick={onSubmitClick}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Respond;
