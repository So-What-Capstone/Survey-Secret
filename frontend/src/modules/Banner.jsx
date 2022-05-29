import { Carousel } from "antd";
import React from "react";
import "../styles/Banner.css";
import PropTypes from "prop-types";
import usage_banner from "../resources/banner2.png";

function Banner({ sources }) {
  const contentStyle = {
    width: "100%",
    height: "25vh",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
  };
  const default_banner = {
    title: "쉽고 안전한 온라인 설문조사 - Survey Secret",
    img_url: usage_banner,
    link: ".",
  };

  return (
    <div className="real-banner-con">
      <Carousel autoplay infinite={false}>
        <a title={default_banner.title} href={default_banner.link}>
          <div style={contentStyle}>
            <img
              className="img-in-banner"
              alt="asdf"
              src={default_banner.img_url}
            />
          </div>
        </a>
        {sources.map((v, i) => (
          <a key={`banner-image-${v.i}`} title={v.title} href={v.link}>
            <div style={contentStyle}>
              <img className="img-in-banner" alt="asdf" src={v.img_url} />
            </div>
          </a>
        ))}
      </Carousel>
    </div>
  );
}
Banner.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      img_url: PropTypes.any,
      link: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
export default Banner;
