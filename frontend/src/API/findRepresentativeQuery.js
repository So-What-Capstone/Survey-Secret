import { gql } from "@apollo/client";
import { answerInfo } from "./common/answerInfo";

export const findRepsQueByFormId = gql`
  query findRepsQueByFormId($formId: String!) {
    findFormById(input: { formId: $formId }) {
      ok
      error
      form {
        representativeQuestion {
          _id
        }
        submissions {
          _id
          isFavorite
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
        ${answerInfo}
      }
    }
  }
`;
