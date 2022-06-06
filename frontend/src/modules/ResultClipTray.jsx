import React from "react";
import PropTypes from "prop-types";
import ClipTray from "./ClipTray";

export default function ResultClipTray({ type, formId }) {
  const clips = [
    {
      title: "내 설문",
      link_enabled: true,
      link: "/my-survey/",
      color_idx: 0,
    },
    {
      title: "목록",
      link_enabled: true,
      link: "/my-survey/result/list?id=" + formId,
      color_idx: type === "list" ? 2 : 1,
    },
    {
      title: "문항",
      link_enabled: true,
      link: "/my-survey/result/question?id=" + formId,
      color_idx: type === "question" ? 2 : 1,
    },
    {
      title: "통계",
      link_enabled: true,
      link: "/my-survey/result/stats?id=" + formId,
      color_idx: type === "stats" ? 2 : 1,
    },
  ];
  return <ClipTray clips={clips} />;
}

ResultClipTray.propTypes = {
  type: PropTypes.string,
  formId: PropTypes.string,
};
