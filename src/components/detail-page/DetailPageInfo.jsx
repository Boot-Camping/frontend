import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import "../detail-page/DetailPage.css";
import { detailPageTag } from "../../constants/detailPageTag";
import { svgCollection } from "../../constants/svgCollection";
import ReadMore from "./ReadMore";
import { get } from "../../utils/Api";

const DetailPageInfo = () => {
  const [detailInfo, setDetailInfo] = useState(null);
  const tag = detailPageTag;
  const svg = svgCollection;

  useEffect(() => {
    const fetchCampInfo = async () => {
      try {
        const response = await get("camp/2");
        setDetailInfo(response);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
      }
    };
    fetchCampInfo();
  }, []);

  if (!detailInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="detail-content underline">
        <div className="rating">
          <div className="stars">
            <ReactSVG src={svg.stars} alt="stars" className="stars-img" />
            {detailInfo.stars}
          </div>
          <div className="views">
            <ReactSVG src={svg.views} alt="views" className="views-img" />
            {detailInfo.views}
          </div>
        </div>
        <div className="main">
          <h2 className="title">{detailInfo.name}</h2>{" "}
          <div className="price">
            {detailInfo.price?.toLocaleString()}원/ 1박{" "}
          </div>
        </div>
        <div className="tags">
          {detailInfo.categories?.map((category, index) => (
            <span key={index} className="tag">
              {category}
            </span>
          ))}
        </div>
        <div className="detail-info">
          <div className="detail-title">기본정보</div>
          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src={svg.location}
              alt="location"
            />
            {detailInfo.addr}
          </div>

          <div className="detail-item">
            <ReactSVG className="detail-icon" src={svg.phone} alt="phone" />
            {detailInfo.phone}
          </div>

          <div className="detail-item">
            <ReactSVG className="detail-icon" src={svg.group} alt="group" />
            기준 수용인원: {detailInfo.standardNum}명 <br />
            최대 수용인원: {detailInfo.maxNum}명{" "}
          </div>

          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src={svg.calculator}
              alt="calculator"
            />
            인당 추가요금 {detailInfo.overCharge?.toLocaleString()}원{" "}
          </div>
        </div>
        <ReadMore text={detailInfo.description} maxLength={80} />{" "}
      </div>
    </div>
  );
};

export default DetailPageInfo;
