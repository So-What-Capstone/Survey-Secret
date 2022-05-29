import { gql } from "@apollo/client";
import { sectionsInfo } from "./common/sectionsInfo";

export const findTemplateByIdQuery = gql`
  query findTemplateById($templateId: String!) {
    findTemplateById(input: { templateId: $templateId }) {
      ok
      error
      template {
        title
        description
        ${sectionsInfo}
      }
    }
  }
`;
