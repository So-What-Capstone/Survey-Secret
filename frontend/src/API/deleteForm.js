import { gql } from "@apollo/client";

export const DELETE_FORM_MUTATION = gql`
  mutation deleteForm($formId: String!) {
    deleteForm(input: { formId: $formId }) {
      ok
      error
    }
  }
`;
