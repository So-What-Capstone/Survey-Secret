import { gql } from "@apollo/client";
import { answerInfo } from "./common/answerInfo";
import { questionInfo } from "./common/questionInfo";

export const findAnswerByQuestionIdQuery = gql`
  query findAnswerByQuestionId($formId: String!, $questionId: String!) {
    findAnswerByQuestionId(
      input: { formId: $formId, questionId: $questionId }
    ) {
      ok
      error
      answers{
        submissionId
        ${answerInfo}
      }
    }
  }
`;
