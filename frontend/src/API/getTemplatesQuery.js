import { gql } from "@apollo/client";
import { sectionsInfo } from "./common/sectionsInfo";

export const getTemplatesQuery = gql`
  query {
    getTemplates {
      ok
      error
      templates {
        title
        description
        _id
        ${sectionsInfo}
      }
    }
  }
`;
