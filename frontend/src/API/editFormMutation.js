import { gql } from "@apollo/client";

export const editFormMutation = gql`
  mutation editForm($request: EditFormInput!) {
    editForm(input: $request) {
      ok
      error
    }
  }
`;
