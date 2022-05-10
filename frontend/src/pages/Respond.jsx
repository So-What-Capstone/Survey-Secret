import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Form from "../modules/Form";
import {
  FIND_FORM_BY_ID_QUERY,
  getFormConfigFromDB,
  getQuestionKind,
} from "../modules/FormConfig";
import { template_list } from "../modules/Templates";
import "../styles/Respond.css";

// const formId = "62799659986c0549c7688c63";

const CREATE_SUBMISSION_MUTATION = gql`
  mutation createSubmission($request: CreateSubmissionInput!) {
    createSubmission(input: $request) {
      ok
      error
    }
  }
`;

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
      console.log("Query Completed");
      console.log("data", data);
      const config = getFormConfigFromDB(formId, data);
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

        if ((0 <= type && type <= 2) || type === 4) {
          // Closed, Linear
          ansDic["no"] = qVal.data;
        } else if (type === 3 || type === 6 || type === 5) {
          // Opened, Phone, grid
          ansDic["content"] = qVal.data;
        } else if (type === 7) {
          // email
          ansDic["content"] = qVal.id + qVal.domain;
        } else if (type === 8) {
          // date
          ansDic["content"] = qVal.date_str;
        } else if (type === 9) {
          // address
          ansDic["content"] =
            qVal.zip_code + qVal.address + qVal.address_detail;
        }
        if (!ansDic.no && !ansDic.content) continue;
        if (ansDic.no) {
          if (ansDic.no.length === 0) continue;
        }
        answers[kind].push(ansDic);
      }
      sub_secs[i]["answers"] = [answers];
    }
    const submission = {
      variables: {
        request: {
          formId: form_config.id,
          sections: sub_secs,
        },
      },
    };
    /* // example of submission
    {
      variables: {
        request: {
          formId: "62797e7d52d860cef3a4f652",
          sections: {
            sectionId: "62797e7d52d860cef3a4f653",
            answers: [
              {
                Closed: [
                  {
                    no: [1, 2],
                    kind: "Closed",
                    question: "62797e7d52d860cef3a4f654",
                  },
                ],
              },
            ],
          },
        },
      },
    }
    */

    //response => Submission.
    createSubmission(submission);

    console.log("submission", submission);
    // if (isValid) {
    //   alert("제출되었습니다.");
    // } else {
    //   alert("필수 응답문항을 모두 답해주세요.");
    // }
  };

  if (!form_config) return null;
  return (
    <div className="respond-container">
      <div className="preview">
        <Form
          _config={form_config}
          // _response={response}
          _setResponse={setResponse}
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
