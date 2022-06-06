import { gql } from "@apollo/client";

export const setFavoriteSubmissions = gql`
  query setFavoriteSubmissions(
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
