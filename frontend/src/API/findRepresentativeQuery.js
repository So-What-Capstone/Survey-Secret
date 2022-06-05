import { gql } from "@apollo/client";
import { answerInfo } from "./common/answerInfo";
import { questionInfo } from "./common/questionInfo";

export const findRepsQueByFormId = gql`
  query findRepsQueByFormId($formId: String!) {
    findFormById(input: { formId: $formId }) {
      ok
      error
      form {
        sections {
          questions {
            ... on PersonalQuestion {
              _id
              personalType
            }
          }
        }
        representativeQuestion {
          _id
        }
      }
    }
  }
`;

export const findRepsAnsByQueId = gql`
  query findRepsAnsByQueId($formId: String!, $questionId: String!) {
    findAnswerByQuestionId(
      input: { formId: $formId, questionId: $questionId }
    ) {
      ok
      error
      answers {
        submissionId
        isFavorite
        ${answerInfo}
      }
      ${questionInfo}
    }
  }
`;
