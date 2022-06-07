import { useQuery } from "@apollo/client";
import { getSignedUrlQuery } from "./../API/getSignedUrlQuery";
import { useState } from 'react';
import { useEffect } from 'react';

function Uploader() {
    const GET_SIGNED_URL_QUERY = getSignedUrlQuery;

    const [url, setUrl] = useState();
  
    const { data,loading,error } = useQuery(GET_SIGNED_URL_QUERY, {
      variables: {
        fileName: "profile.png",
        imageType: "Users",
      },
      onCompleted: (data) => {
        if (data.getSignedUrl?.ok) {
          setUrl(data.getSignedUrl?.url);
        }
      },
    });

    useEffect(()=>{
        const res = await fetch(url);
        console.log(res);
    },[url])
}
