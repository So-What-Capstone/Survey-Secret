import { gql } from "@apollo/client";
import { questionInfo } from "./common/questionInfo";

/*
export const findQueTypeById = gql`
  query findQueTypeById($formId: String!, $queId: String!) {
    findQuestionById(input: { formId: $formId, questionId: $queId }) {
      ok
      error
      question {
        __typename
      }
    }
  }
`;*/

export const findQueById = gql`
  query findQueById($formId: String!, $queId: String!) {
    findQuestionById(input: { formId: $formId, questionId: $queId }) {
      ok
      error
      ${questionInfo}
    }
  }
`;
