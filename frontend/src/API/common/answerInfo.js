export const answerInfo = `answer {
  ...on ClosedAnswer {
    closedAnswer
  }
  ... on OpenedAnswer {
    openedAnswer
  }
  ... on LinearAnswer {
    linearAnswer
  }
  ... on GridAnswer {
    gridAnswer {
      rowNo
      colNo
    }
  }
  ... on PersonalAnswer {
    personalAnswer
  }
}`;
