import { gql } from "@apollo/client";

export const createAccountQuery = gql`
  mutation createSubmission($request: CreateSubmissionInput!) {
    createSubmission(input: $request) {
      ok
      error
    }
  }
`;
