import { gql } from "@apollo/client";

export const setFavoriteSubmissionsMutation = gql`
  mutation setFavoriteSubmissions(
    $formId: String!
    $favoriteSubmissions: [FavoriteSubmission!]!
  ) {
    setFavoriteSubmissions(
      input: { formId: $formId, favoriteSubmissions: $favoriteSubmissions }
    ) {
      ok
      error
    }
  }
`;
