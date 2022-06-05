import { gql } from "@apollo/client";

export const findFormByIdQuery = gql`
  query findFormById($formId: String!) {
    findFormById(input: { formId: $formId }) {
      ok
      error
      form {
        _id
        title
        state
        description
        isPromoted
        expiredAt
        privacyExpiredAt
        createdAt
        updatedAt
        sections {
          _id
          title
          order
          questions {
            ... on ClosedQuestion {
              _id
              order
              content
              description
              required
              kind
              closedType
              choices {
                no
                choice
                activatedSection
              }
            }
            ... on OpenedQuestion {
              _id
              order
              content
              description
              required
              kind
              openedType
              attachment
            }
            ... on LinearQuestion {
              _id
              order
              content
              description
              required
              kind
              leftRange
              rightRange
              leftLabel
              rightLabel
            }
            ... on GridQuestion {
              _id
              order
              content
              description
              required
              kind
              rowContent
              colContent
            }
            ... on PersonalQuestion {
              _id
              order
              content
              description
              required
              kind
              attachment
              personalType
            }
          }
        }
      }
    }
  }
`;
