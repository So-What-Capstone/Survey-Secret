import { gql } from "@apollo/client";

export const findTemplateByIdQuery = gql`
  query findTemplateById($templateId: String!) {
    findTemplateById(input: { templateId: $templateId }) {
      ok
      error
      template {
        title
        description
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
              rowContent
              colContent
              kind
            }
            ... on PersonalQuestion {
              _id
              order
              content
              description
              required
              kind
              personalType
            }
          }
        }
      }
    }
  }
`;
