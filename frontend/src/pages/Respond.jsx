import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/Respond.css";

const formId = "62790a9fa2b013e1c29571d7";

const FIND_FORM_BY_ID_QUERY = gql`
  query findFormById($formId: String!) {
    findFormById(input: { formId: $formId }) {
      ok
      error
      form {
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

const CREATE_SUBMISSION_MUTATION = gql`
  mutation createSubmission($request: CreateSubmissionInput!) {
    createSubmission(input: $request) {
      ok
      error
    }
  }
`;

function Respond() {
  const { loading, data, error } = useQuery(FIND_FORM_BY_ID_QUERY, {
    variables: { formId },
    onCompleted: (data) => {
      console.log("Query Completed");
      console.log(data);
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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const onSubmitClick = () => {
    // submit the response
    let isValid = true;
    for (const idx in response) {
      if (!response[idx].isValid) {
        isValid = false;
        break;
      }
    }

    //response => Submission.
    createSubmission({
      variables: {
        request: {
          formId: "62796414d8360fa79dec9954",
          sections: {
            sectionId: "62796414d8360fa79dec9955",
            answers: [
              {
                Closed: [
                  {
                    no: 1,
                    kind: "Closed",
                    question: "62796414d8360fa79dec9956",
                  },
                ],
              },
            ],
          },
        },
      },
    });

    console.log(response);
    // if (isValid) {
    //   alert("제출되었습니다.");
    // } else {
    //   alert("필수 응답문항을 모두 답해주세요.");
    // }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      //
    } else {
      navigate("/");
    }
  }, [searchParams]);
  return (
    <div className="respond-container">
      <div className="preview">
        <Form
          _config={template_list[2]}
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
