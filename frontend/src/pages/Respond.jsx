import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createSubmissionMutation } from "../API";
import { QType } from "../modules";
import Form from "../modules/Form";
import {
  FIND_FORM_BY_ID_QUERY,
  getFormConfigFromDB,
  getQuestionKind,
} from "../modules/FormConfig";
import "../styles/Respond.css";

const CREATE_SUBMISSION_MUTATION = createSubmissionMutation;

function FormRespToSubm(form_config, response, secEnabled) {
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
  let sub_secs = [];

  for (let i = 0; i < form_config.sections.length; i++) {
    let num_in_sec = 0;
    let sec = form_config.sections[i];
    let temp_sec = { sectionId: sec.id, answers: [] };
    if (!secEnabled[i]) continue;

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
      if (!qVal.isValid) {
        console.log(qVal);
        alert("답변이 유효하지 않습니다!");
        return null;
      }
      if (QType.CLOSED_ONE <= type && type <= QType.CLOSED_INPUT) {
        //closed
        ansDic["closedAnswer"] = qVal.data;
        if (ansDic["closedAnswer"].length === 0) continue;
      } else if (type === QType.LINEAR) {
        // linear
        ansDic["linearAnswer"] = qVal.data;
      } else if (type === QType.OPENED) {
        // Opened
        ansDic["openedAnswer"] = qVal.data;
        if (ansDic["openedAnswer"].length === 0) continue;
      } else if (type === QType.PHONE) {
        // phone
        ansDic["personalAnswer"] = qVal.data;
        if (ansDic["personalAnswer"].length === 0) continue;
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
      } else if (type === QType.EMAIL) {
        // email
        if (qVal.id.length === 0) continue;
        ansDic["personalAnswer"] = qVal.id + qVal.domain;
      } else if (type === QType.DATE) {
        // date
        ansDic["opendAnswer"] = qVal.date_str;
      } else if (type === QType.ADDRESS) {
        // address
        ansDic["openedAnswer"] = String(
          qVal.zip_code + qVal.address + qVal.address_detail
        );
        if (ansDic["openedAnswer"].length === 0) continue;
      }

      answers[kind].push(ansDic);
      num_in_sec++;
    }
    if (num_in_sec > 0) {
      temp_sec["answers"] = answers;
      sub_secs.push(temp_sec);
    }
  }

  let submission = {
    variables: {
      request: {
        formId: form_config.id,
        sections: sub_secs,
      },
    },
  };
  console.log("submit", submission);
  // return null;
  return submission;
}

function Respond() {
  const [form_config, setFormConfig] = useState();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState("");
  const [secEnabled, setSecEnabled] = useState();
  const [findForm] = useLazyQuery(FIND_FORM_BY_ID_QUERY);
  useEffect(() => {
    async function myEffect() {
      console.log("useeffect");
      // location.reload();
      const id = searchParams.get("id");
      if (id) {
        setFormId(id);
      } else {
        navigate("/");
      }
      let findform_ret = await findForm({ variables: { formId: id } });
      console.log(findform_ret.data);
      let data = findform_ret.data;

      let formData = data.findFormById.form;
      if (formData?.state !== "InProgress") {
        let msg = "현재 설문을 이용할 수 없습니다.";
        alert(msg);
        navigate("/");
      }
      const config = getFormConfigFromDB(id, formData, formData.sections);

      setFormConfig(config);
    }
    myEffect();
  }, [searchParams]);

  const [createSubmission, { loading: mutationLoading }] = useMutation(
    CREATE_SUBMISSION_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createSubmission: { ok, error },
        } = data;
        if (!ok || error) {
          alert(error);
        } else {
          alert("제출되었습니다.");
          navigate("/");
        }
      },
    }
  );

  const navigate = useNavigate();
  const [response, setResponse] = useState();

  const onSubmitClick = async () => {
    // submit the response

    // make submission shape for the mutation
    let submission = FormRespToSubm(form_config, response, secEnabled);
    if (!submission) return;
    //response => Submission.
    try {
      await createSubmission(submission);
    } catch (err) {
      if (err) console.error(JSON.stringify(err, null, 2));
    }
  };

  if (!form_config) return null;
  return (
    <div className="respond-container">
      <div className="preview">
        <Form
          _config={form_config}
          _setResponse={setResponse}
          secEnabled={secEnabled}
          setSecEnabled={setSecEnabled}
        />
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
