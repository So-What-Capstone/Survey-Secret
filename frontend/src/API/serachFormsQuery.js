import { gql } from "@apollo/client";

export const searchFormsQuery = gql`
  query searchForms(
    $title: String!
    $lastId: String
    $sortKey: SortKey
    $desc: Boolean
  ) {
    searchForms(
      input: { title: $title, lastId: $lastId, sortKey: $sortKey, desc: $desc }
    ) {
      ok
      error
      forms {
        _id
        title
        description
        expiredAt
        privacyExpiredAt
        owner {
          username
        }
      }
      lastId
    }
  }
`;
