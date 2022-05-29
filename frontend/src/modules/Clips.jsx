import React from "react";
import "../styles/Clips.css";

// eslint-disable-next-line react/prop-types
export default function Clip({ title, link_enabled, link, color_idx }) {
  const colors = ["dark-blue", "sky-blue", "mint"];

  var clip_text = <div />;
  if (link_enabled)
    clip_text = (
      <a
        className={color_idx === 0 ? "clip-text-white" : "clip-text-black"}
        href={link}
        style={{ color: "inherit" }}
      >
        {" "}
        {title}
      </a>
    );
  else
    clip_text = (
      <div className={color_idx === 0 ? "clip-text-white" : "clip-text-black"}>
        {" "}
        {title}
      </div>
    );

  return <div className={"clip " + colors[color_idx]}>{clip_text}</div>;
}
