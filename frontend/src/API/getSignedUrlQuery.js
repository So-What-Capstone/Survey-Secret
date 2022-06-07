import { gql } from "@apollo/client";

export const getSignedUrlQuery = gql`
  query getSignedUrl($fileName: String!, $imageType: ImageType!) {
    getSignedUrl(input: { fileName: $fileName, imageType: $imageType }) {
      ok
      error
      url
    }
  }
`;
