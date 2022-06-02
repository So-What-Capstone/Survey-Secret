import { gql } from "@apollo/client";

export const editUserMutation = gql`
  mutation editUser($text: EditUserInput!, $file: Upload!) {
    editUser(input: $text, file: $file) {
      ok
      error
    }
  }
`;
