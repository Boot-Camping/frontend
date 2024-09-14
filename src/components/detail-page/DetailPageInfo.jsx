import React, { useState } from "react";
import "../detail-page/DetailPage.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

import ReadMore from "./ReadMore";
import { post } from "../../utils/api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

const DetailPageInfo = ({ detailInfo }) => {
  const svg = svgCollection;
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const { userId, accessToken } = getUserIdFromToken();

  // 찜하기(POST)
  const toggleSave = async () => {
    try {
      const response = await post(
        `userprofile/wishlist/add/${detailInfo.id}`,
        {},
        {
          Authorization: `${accessToken}`,
        }
      );
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("찜하기 요청 오류🥲:", error);
      setError("찜하기 오류 발생 🥲");
    }
  };

  // 리팩토링용 함수
  const renderDetailItem = (icon, content) => (
    <div className="detail-item">
      <ReactSVG className="detail-icon" src={icon} alt={content} />
      {content}
    </div>
  );

  return (
    <div>
      <div className="detail-content underline">
        <div className="rating-and-save-box">
          <div className="rating">
            <div className="stars">
              <ReactSVG src={svg.stars} alt="stars" className="stars-img" />
              {detailInfo.averageGrade?.toFixed(1)}
            </div>

            <div className="views">
              <ReactSVG src={svg.views} alt="views" className="views-img" />
              {detailInfo.viewCount}
            </div>
          </div>

          <button className="save" onClick={toggleSave}>
            <ReactSVG
              src={svg.heart}
              alt="heart"
              className="save-btn-img"
              beforeInjection={(svg) => {
                svg
                  .querySelector("path")
                  .setAttribute("fill", isSaved ? "red" : "none");
              }}
            />
            <div className="save-btn-text">찜하기</div>
          </button>
        </div>

        <div className="main">
          <h2 className="title">{detailInfo.name}</h2>
          <div className="price">
            {detailInfo.price?.toLocaleString()}원/ 1박
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
          {renderDetailItem(svg.location, detailInfo.addr)}
          {renderDetailItem(svg.phone, detailInfo.tel)}
          {renderDetailItem(
            svg.group,
            `기준 수용인원: ${detailInfo.standardNum}명/ 최대 수용인원: ${detailInfo.maxNum}명`
          )}
          {renderDetailItem(
            svg.calculator,
            `인당 추가요금 ${detailInfo.overCharge?.toLocaleString()}원`
          )}
        </div>
        <ReadMore text={detailInfo.description} maxLength={80} />
      </div>
    </div>
  );
};

export default DetailPageInfo;
