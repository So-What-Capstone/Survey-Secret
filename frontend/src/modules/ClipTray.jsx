import React from "react";
import Clip from "./Clips";
import "../styles/Clips.css";

// eslint-disable-next-line react/prop-types
export default function ClipTray({ clips }) {
  return (
    <div className="clip-tray">
      {
        // eslint-disable-next-line react/prop-types
        clips.map((clip) => (
          <Clip
            key={clip}
            title={clip.title}
            link_enabled={clip.link_enabled}
            link={clip.link}
            color_idx={clip.color_idx}
          />
        ))
      }
    </div>
  );
}
