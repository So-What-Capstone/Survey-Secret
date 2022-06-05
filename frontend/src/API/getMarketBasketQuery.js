import { gql } from "@apollo/client";

export const getMarketBasketQuery = gql`
  query getMarketBasketQuery($formId: String!, $questionIds: [String!]!) {
    getMarketBasket(input: { formId: $formId, questionIds: $questionIds }) {
      ok
      error
      result
    }
  }
`;
