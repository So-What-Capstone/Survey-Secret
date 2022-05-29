import { gql } from "@apollo/client";
import { sectionsInfo } from "./common/sectionsInfo";

//get simple info
export const getMyFormsSimpleQuery = gql`
  {
    me {
      ok
      error
      user {
        forms {
          _id
          title
          description
          state
          expiredAt
          privacyExpiredAt
        }
      }
    }
  }
`;

export const getMyFormsQuery = gql`
  query {
    me {
      ok
      error
      user {
        forms {
          _id
          title
          description
          createdAt
          ${sectionsInfo}
        }
      }
    }
  }
`;
