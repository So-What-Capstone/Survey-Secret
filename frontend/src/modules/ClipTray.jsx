import React from "react";
import Clip from "./Clips";
import "../styles/Clips.css";
import PropTypes from "prop-types";

export default function ClipTray({ clips }) {
  return (
    <div className="clip-tray">
      {clips.map((clip, i) => (
        <Clip
          key={i}
          title={clip.title}
          link_enabled={clip.link_enabled}
          link={clip.link}
          color_idx={clip.color_idx}
        />
      ))}
    </div>
  );
}

ClipTray.propTypes = {
  clips: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link_enabled: PropTypes.bool,
      link: PropTypes.string,
      color_idx: PropTypes.number,
    })
  ),
};
