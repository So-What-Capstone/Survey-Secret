import React from "react";
import "../styles/Clips.css";

// eslint-disable-next-line react/prop-types
export default function Clip({ title, link_enabled, link, color_idx }) {
  const colors = ["green", "yellow", "deep-green", "beige"];

  var clip_text = <div />;
  if (link_enabled)
    clip_text = (
      <a className="clip-text" href={link} style={{ color: "inherit" }}>
        {title}
      </a>
    );
  else clip_text = <div className="clip-text"> {title}</div>;

  return <div className={"clip " + colors[color_idx]}>{clip_text}</div>;
}
