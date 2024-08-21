import React from "react";
import { ReactSVG } from "react-svg";
import "../detail-page/DetailPage.css";

import { detailCampingInfo } from "../../constants/detailCampingInfo";
import { detailPageTag } from "../../constants/detailPageTag";
import { svgCollection } from "../../constants/svgCollection";
import ReadMore from "./ReadMore";

const DetailPageInfo = () => {
  const getDetailInfo = (id) => {
    const info = detailCampingInfo.find((item) => item.id === id);
    return info ? info.value : "";
  };

  const tag = detailPageTag;
  const svg = svgCollection;

  return (
    <div>
      <div className="detail-content underline">
        <div className="rating">
          <div className="stars">
            <ReactSVG src={svg.stars} alt="stars" className="stars-img" />
            {getDetailInfo("stars")}
          </div>
          <div className="views">
            <ReactSVG src={svg.views} alt="views" className="views-img" />
            {getDetailInfo("views")}
          </div>
        </div>

        <div className="main">
          <h2 className="title">{getDetailInfo("name")}</h2>
          <div className="price">
            {getDetailInfo("price").toLocaleString()}원/ 1박
          </div>
        </div>

        <div className="tags">
          <span className="tag">{tag.tag1}</span>
          <span className="tag">{tag.tag2}</span>
          <span className="tag">{tag.tag3}</span>
          <span className="tag">{tag.tag4}</span>
          <span className="tag">{tag.tag5}</span>
        </div>

        <div className="detail-info">
          <div className="detail-title">기본정보</div>
          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src={svg.location}
              alt="location"
            />
            {getDetailInfo("location")}
          </div>

          <div className="detail-item">
            <ReactSVG className="detail-icon" src={svg.phone} alt="phone" />
            {getDetailInfo("phone")}
          </div>

          <div className="detail-item">
            <ReactSVG className="detail-icon" src={svg.group} alt="group" />
            기준 수용인원: {getDetailInfo("standardNum")}명 <br />
            최대 수용인원: {getDetailInfo("maxNum")}명
          </div>

          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src={svg.calculator}
              alt="calculator"
            />
            인당 추가요금 {getDetailInfo("overCharge").toLocaleString()}원
          </div>
        </div>
        <ReadMore text={getDetailInfo("description")} maxLength={80} />
      </div>
    </div>
  );
};

export default DetailPageInfo;
