import { Carousel } from "antd";
import React from "react";
import "../styles/Banner.css";
import PropTypes from "prop-types";
import usage_banner from "../resources/banner_manual.png";
import banner3 from "../resources/banner_safe.png";
import banner4 from "../resources/banner_premium.png";

function Banner({ sources }) {
  const default_banners = [
    {
      title: "쉽고 안전한 온라인 설문조사 - Survey Secret",
      img_url: usage_banner,
      link: ".",
    },
    {
      title: "쉽고 안전한 온라인 설문조사 - Survey Secret",
      img_url: banner3,
      link: ".",
    },
    {
      title: "쉽고 안전한 온라인 설문조사 - Survey Secret",
      img_url: banner4,
      link: ".",
    },
  ];

  function CarouselItem({ value }) {
    return (
      <a title={value.title} href={value.link}>
        <div className="img-in-banner-con">
          <div className="img-in-banner-back-con">
            <img
              className="img-in-banner-back"
              alt="asdf"
              src={value.img_url}
              style={{ objectFit: "cover" }}
            />
          </div>

          <img className="img-in-banner" src={value.img_url} />
        </div>
      </a>
    );
  }
  CarouselItem.propTypes = {
    value: PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      img_url: PropTypes.any,
    }),
  };

  return (
    <div className="real-banner-con">
      <Carousel infinite autoplay dotPosition="top">
        {default_banners.map((v, i) => (
          <CarouselItem key={v.img_url + i} value={v} />
        ))}
        {sources.map((v, i) => (
          <CarouselItem key={v.img_url + i} value={v} />
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
