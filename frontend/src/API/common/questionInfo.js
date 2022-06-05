export const questionInfo = `question {
  __typename
  ... on ClosedQuestion {
    content
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
