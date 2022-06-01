import { gql } from "@apollo/client";

export const searchFormsQuery = gql`
  query searchForms($title: String!) {
    searchForms(input: { title: $title }) {
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
