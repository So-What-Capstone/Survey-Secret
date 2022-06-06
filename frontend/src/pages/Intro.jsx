import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import info_safe from "../resources/info_safe.jpg";
import info_premium from "../resources/info_premium.jpg";
import "../styles/Intro.css";

function Intro() {
  const [type, setType] = useState("safe");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setType(searchParams.get("type"));
  }, searchParams);
  console.log(type);
  if (type === "safe") return <img src={info_safe} />;
  else return <img src={info_premium} />;
}

export default Intro;
