export const sectionsInfo = `sections {
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
        rowContent
        colContent
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
  }`;
