import { gql } from "@apollo/client";

export const createAccountQuery = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      input: { email: $email, username: $username, password: $password }
    ) {
      ok
      error
    }
  }
`;
