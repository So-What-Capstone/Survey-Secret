import { gql } from "@apollo/client";

export const getDescribeQuery = gql`
  query getDescribeQuery($formId: String!) {
    getDescribe(input: { formId: $formId }) {
      ok
      error
      result
    }
  }
`;
