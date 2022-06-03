import { gql } from "@apollo/client";

export const findRepsQueByFormId = gql`
  query findRepsQueByFormId($formId: FindFormByIdInput!) {
    findFormById(input: $formId) {
      ok
      error
      form {
        representativeQuestion {
          _id
          content
          kind
        }
      }
    }
  }
`;
