import { gql } from "@apollo/client";

export const createSubmissionMutation = gql`
  mutation createSubmission($request: CreateSubmissionInput!) {
    createSubmission(input: $request) {
      ok
      error
    }
  }
`;
