import { gql, useMutation, useQuery } from "@apollo/client";
import { QType } from "./question/QuestionType";

export const FIND_FORM_BY_ID_QUERY = gql`
  query findFormById($formId: String!) {
    findFormById(input: { formId: $formId }) {
      ok
      error
      form {
        title
        description
        state
        createdAt
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
              personalType
            }
          }
        }
      }
    }
  }
`;

export function getQuestionType(question) {
  const kind = question.kind;
  let typecode = -1;
  switch (kind) {
    case "Closed":
      if (question.closedType === "One") typecode = QType.CLOSED_ONE;
      else if (question.closedType === "Multiple") typecode = QType.CLOSED_MULT;
      else typecode = QType.ERROR;
      break;
    case "Opened":
      if (question.openedType === "Default") typecode = QType.OPENED;
      else if (question.openedType === "Date") typecode = QType.DATE;
      else if (question.openedType === "Time") typecode = QType.ERROR; // TODO
      else if (question.openedType === "Address") typecode = QType.ADDRESS;
      else if (question.openedType === "File") typecode = QType.ERROR; // TODO
      else typecode = QType.ERROR;
      break;
    case "Linear":
      typecode = QType.LINEAR;
      break;
    case "Grid":
      typecode = QType.GRID;
      break;
    case "Personal":
      if (question.personalType === "Phone") typecode = QType.PHONE;
      else if (question.personalType === "Email") typecode = QType.EMAIL;
      else typecode = QType.ERROR;
      break;
  }
  return typecode;
}
export function getQuestionKind(type) {
  if (QType.CLOSED_ONE <= type && type <= QType.CLOSED_INPUT) {
    return "Closed";
  } else if (type === QType.LINEAR) {
    return "Linear";
  } else if (type === QType.GRID) {
    return "Grid";
  } else if (type === QType.PHONE || type === QType.EMAIL) {
    return "Personal";
  } else {
    return "Opened";
  }
}
export function getFormConfigFromDB(formId, formDB, sectionsDB) {
  const form = formDB;
  let sections = sectionsDB;

  let myConfig = {
    id: formId,
    title: form.title,
    description: form.description,
    state: form.state,
  };

  let mySections = new Array(sections.length);
  for (let i = 0; i < sections.length; i++) {
    let sec = sections[i];
    mySections[i] = { id: sec._id, title: sec.title };

    let myqs = new Array(sec.questions.length);
    for (let j = 0; j < sec.questions.length; j++) {
      let q = sec.questions[j];
      const type = getQuestionType(q);
      // common config of question
      myqs[j] = {
        id: q._id,
        type: type,
        config: {
          content: q.content,
          description: q.description,
          required: q.required,
        },
      };

      // specific config
      if (QType.CLOSED_ONE <= type && type <= QType.CLOSED_MULT) {
        // Closed
        let choices = q.choices.map((ch) => ch.choice);
        let trigger = q.choices.map((ch) =>
          ch.activatedSection ? ch.activatedSection : ""
        );
        myqs[j].config["choices"] = choices;
        myqs[j].config["trigger_sections"] = trigger;
      } else if (type === QType.OPENED) {
        // Opened
        myqs[j].config["isLong"] = true;
      } else if (type === QType.LINEAR) {
        // LInear
        myqs[j].config = {
          ...myqs[j].config,
          leftEnd: q.leftRange,
          rightEnd: q.rightRange,
          leftLabel: q.leftLabel ? q.leftLabel : "",
          rightLabel: q.rightLabel ? q.rightLabel : "",
        };
      } else if (type === QType.GRID) {
        // Grid
        myqs[j].config = {
          ...myqs[j].config,
          rowLabels: q.rowContent,
          colLabels: q.colContent,
        };
      } else if (type === QType.PHONE || type === QType.EMAIL) {
        // Phone, email
        myqs[j].config = {
          ...myqs[j].config,
          isEncrypted: true,
          exp_date: form.privacyExpiredAt,
        };
      }
    }
    mySections[i]["questions"] = myqs;
  }
  myConfig["sections"] = mySections;
  return myConfig;
}
