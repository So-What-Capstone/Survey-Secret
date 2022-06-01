import { gql } from "@apollo/client";

export const findFormByIdForOwnerQuery = gql`
  query findFormByIdForOwner($formId: String!) {
    findFormByIdForOwner(input: { formId: $formId }) {
      ok
      error
      form {
        _id
        title
        state
        createdAt
        submissions {
          _id
          answers {
            ... on OpenedAnswer {
              _id
              openedAnswer
            }
            ... on LinearAnswer {
              _id
              linearAnswer
            }
            ... on PersonalAnswer {
              _id
              personalAnswer
              attachment
            }
            ... on ClosedAnswer {
              _id
              closedAnswer
            }
            ... on GridAnswer {
              _id
              gridAnswer {
                rowNo
                colNo
              }
            }
          }
          createdAt
        }
        sections {
          _id
          title
          order
          questions {
            ... on ClosedQuestion {
              _id
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
              content
              description
              required
              kind
              openedType
            }
            ... on LinearQuestion {
              _id
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
              content
              description
              required
              kind
            }
            ... on PersonalQuestion {
              _id
              content
              description
              required
              kind
            }
          }
        }
      }
    }
  }
`;
