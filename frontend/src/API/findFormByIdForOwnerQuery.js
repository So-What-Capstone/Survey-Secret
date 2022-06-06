import { gql } from "@apollo/client";

export const findFormByIdForOwnerQuery = gql`
  query findFormByIdForOwner($formId: String!) {
    findFormByIdForOwner(input: { formId: $formId }) {
      ok
      error
      form {
        _id
        title
        description
        state
        createdAt
        representativeQuestion {
          _id
        }
        submissions {
          isFavorite
          _id
          answers {
            ... on OpenedAnswer {
              _id
              kind
              question
              openedAnswer
            }
            ... on LinearAnswer {
              _id
              kind
              question
              linearAnswer
            }
            ... on PersonalAnswer {
              _id
              kind
              question
              personalAnswer
              attachment
            }
            ... on ClosedAnswer {
              _id
              kind
              question
              closedAnswer
            }
            ... on GridAnswer {
              _id
              kind
              question
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
              rowContent
              colContent
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
