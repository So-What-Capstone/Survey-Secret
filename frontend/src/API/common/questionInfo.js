export const questionInfo = `question {
  __typename
  ... on ClosedQuestion {
    content
    choices {
      no
      choice
    }
  }
  ... on OpenedQuestion {
    content
  }
  ... on LinearQuestion {
    content
    leftRange
    rightRange
    leftLabel
    rightLabel
  }
  ... on GridQuestion {
    content
    rowContent
    colContent
  }
  ... on PersonalQuestion {
    content
  }
}`;
