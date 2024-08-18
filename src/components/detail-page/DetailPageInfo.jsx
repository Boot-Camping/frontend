import React from "react";
import { ReactSVG } from "react-svg";

import "../detail-page/DetailPage.css";
import stars from "../../assets/svg/star.svg";
import views from "../../assets/svg/view.svg";
import location from "../../assets/svg/location.svg";
import phone from "../../assets/svg/phone.svg";
import { mockDetailInfo } from "../../constants/mockDetailInfo";
import ReadMore from "./ReadMore";

const DetailPageInfo = () => {
  const mockInfo = mockDetailInfo[0];
  const mockTag = mockDetailInfo[1];

  return (
    <div>
      <div className="detail-content underline">
        <div class="rating">
          <div className="stars">
            <ReactSVG src={stars} alt="" className="stars-img" />
            {mockInfo.stars}
          </div>
          <div className="views">
            <ReactSVG src={views} alt="" className="views-img" />
            {mockInfo.views}
          </div>
        </div>

        <div className="main">
          <h2 className="title">{mockInfo.title}</h2>
          <div className="price">{mockInfo.price}원/ 1박</div>
        </div>

        <div className="tags">
          <span className="tag">{mockTag.tag1}</span>
          <span className="tag">{mockTag.tag2}</span>
          <span className="tag">{mockTag.tag3}</span>
          <span className="tag">{mockTag.tag4}</span>
          <span className="tag">{mockTag.tag5}</span>
        </div>

        <div className="detail-info">
          <div className="detail-title">기본정보</div>
          <div className="detail-item">
            <ReactSVG className="detail-icon" src={location} />
            {mockInfo.location}
          </div>

          <div className="detail-item">
            <ReactSVG className="detail-icon" src={phone} alt="" />{" "}
            {mockInfo.phone}
          </div>

          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src="../src/assets/svg/group.svg"
              alt=""
            />
            기준인원 {mockInfo.standardNum}명 / 최대인원 {mockInfo.maxNum}명
          </div>

          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src="../src/assets/svg/calculator.svg"
              alt=""
            />
            인당 추가요금 {mockInfo.overCharge}원
          </div>
        </div>
        <ReadMore text={mockInfo.description} maxLength={80} />
      </div>
    </div>
  );
};

export default DetailPageInfo;
