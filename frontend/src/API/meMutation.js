import { gql } from "@apollo/client";

export const editUserMutation = gql`
  mutation editUser(
    $username: String!
    $password: String!
    $avatarImg: String
  ) {
    editUser(
      input: { username: $username, password: $password, avatarImg: $avatarImg }
    ) {
      ok
      error
    }
  }
`;
