import { gql } from "@apollo/client";

export const getKeywordAnalysisQuery = gql`
  query getKeywordAnalysisQuery($formId: String!, $questionId: String!) {
    getKeywordAnalysis(input: { formId: $formId, questionId: $questionId }) {
      ok
      error
      result
    }
  }
`;
