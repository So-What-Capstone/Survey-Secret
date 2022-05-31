import { gql } from "@apollo/client";

export const getCorrQuery = gql`
  query getCorrQuery($formId: String!, $questionIds: [String!]!) {
    getCorrQuery(input: { formId: $formId, questionIds: $questionIds }) {
      ok
      error
      result
    }
  }
`;
