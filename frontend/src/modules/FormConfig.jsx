import { gql, useMutation, useQuery } from "@apollo/client";

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
              kind
              gridType
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

export function getQuestionType(question) {
  const kind = question.kind;
  let typecode = -1;
  switch (kind) {
    case "Closed":
      if (question.closedType === "One") typecode = 0;
      else if (question.closedType === "Multiple") typecode = 1;
      break;
    case "Opened":
      if (question.openedType === "Default") typecode = 3;
      else if (question.openedType === "Date") typecode = 7;
      else if (question.openedType === "Time") typecode = 7; // TODO
      else if (question.openedType === "Address") typecode = 9;
      else if (question.openedType === "File") typecode = 10; // TODO
      break;
    case "Linear":
      typecode = 4;
      break;
    case "Grid":
      typecode = 5;
      break;
    case "Personal":
      if (question.personalType === "Phone") typecode = 6;
      else if (question.personalType === "Email") typecode = 7;
      break;
  }
  return typecode;
}
export function getQuestionKind(type) {
  if (0 <= type && type <= 2) {
    return "Closed";
  } else if (type === 4) {
    return "Linear";
  } else if (type === 5) {
    return "Grid";
  } else if (type === 6 || type === 7) {
    return "Personal";
  } else {
    return "Opened";
  }
}
export function getFormConfigFromDB(formId, data) {
  const form = data.findFormById.form;
  let sections = data.findFormById.form.sections;

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
      if (0 <= type && type <= 2) {
        // Closed
        let choices = q.choices.map((ch) => ch.choice);
        let trigger = q.choices.map((ch) =>
          ch.activatedSection ? ch.activatedSection : ""
        );
        myqs[j].config["choices"] = choices;
        myqs[j].config["trigger_sections"] = trigger;
      } else if (type === 3) {
        // Opened
        myqs[j].config["isLong"] = true;
      } else if (type === 4) {
        // LInear
        myqs[j].config = {
          ...myqs[j].config,
          leftEnd: q.leftRange,
          rightEnd: q.rightRange,
          leftLabel: q.leftLabel ? q.leftLabel : "",
          rightLabel: q.rightLabel ? q.rightLabel : "",
        };
      } else if (type === 5) {
        // Grid
        myqs[j].config = {
          ...myqs[j].config,
          rowLabels: q.rowContent,
          colLabels: q.colContent,
        };
      } else if (type === 6 || type === 7) {
        // Phone, email
        myqs[j].config = {
          ...myqs[j].config,
          isEncrypted: q.encoded,
          exp_date: form.privacyExpiredAt,
        };
      }
    }
    mySections[i]["questions"] = myqs;
  }
  myConfig["sections"] = mySections;
  console.log("myconfig", myConfig);
  return myConfig;
}
