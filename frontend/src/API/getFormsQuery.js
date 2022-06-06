import { gql } from "@apollo/client";

export const getFormsQuery = gql`
  query {
    getForms(input: {}) {
      ok
      error
      lastId
      forms {
        _id
        title
        description
        state
        isPromoted
        owner {
          username
        }
        expiredAt
        privacyExpiredAt
      }
    }
  }
`;
