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

export const getUserQuery = gql`
  query {
    me {
      ok
      error
      user {
        avatarImg
        username
        email
      }
    }
  }
`;

export const getMyCoinQuery = gql`
  query {
    me {
      ok
      error
      user {
        coin
      }
    }
  }
`;

export const getMyTypeQuery = gql`
  query {
    me {
      ok
      error
      user {
        type
      }
    }
  }
`;

//현재시각보다 privacyExpiredAt이 늦은 폼만
export const getMyFormsForContactQuery = gql`
  query {
    me {
      ok
      error
      user {
        forms {
          _id
          title
          privacyExpiredAt
        }
      }
    }
  }
`;
