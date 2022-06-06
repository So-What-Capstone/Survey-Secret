import { gql } from "@apollo/client";

export const sendSms = gql`
  mutation sendSms(
    $formId: String!
    $submissionIds: [String!]
    $questionId: String!
    $msg: String!
    $msgType: MsgType!
  ) {
    sendSms(
      input: {
        formId: $formId
        submissionIds: $submissionIds
        questionId: $questionId
        msg: $msg
        msgType: $msgType
      }
    ) {
      ok
      error
    }
  }
`;

export const sendEmail = gql`
  mutation sendEmail(
    $formId: String!
    $submissionIds: [String!]
    $questionId: String!
    $subject: String!
    $template: String
    $emailVars: [EmailVarInput!]
  ) {
    sendEmail(
      input: {
        formId: $formId
        submissionIds: $submissionIds
        questionId: $questionId
        subject: $subject
        template: $template
        emailVars: [{ key: $key, value: $value }]
      }
    ) {
      ok
      error
    }
  }
`;

export const getContactsId = gql`
  query {
    me {
      user {
        contacts {
          _id
        }
      }
    }
  }
`;

export const getContacts = gql`
  query getContactsDetail($contactType: ContactType!) {
    getSendHistory(input: { contactType: $contactType }) {
      ok
      error
      contacts {
        updatedAt
        _id
        receivers {
          _id
        }
        content
        contactType
      }
    }
  }
`;

export const getContactsDetail = gql`
  query getContactsDetail($formId: String!) {
    findFormByIdForOwner(input: { formId: $formId }) {
      ok
      error
      form {
        title
        owner {
          email
        }
      }
    }
  }
`;

export const getMyFormsTitle = gql`
  query {
    me {
      ok
      error
      user {
        forms {
          _id
          title
        }
      }
    }
  }
`;
