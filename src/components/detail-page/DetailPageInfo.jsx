import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import "../detail-page/DetailPage.css";
import { svgCollection } from "../../constants/svgCollection";
import ReadMore from "./ReadMore";
import { post } from "../../utils/api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

const DetailPageInfo = ({ detailInfo }) => {
  const svg = svgCollection;
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const { userId, accessToken } = getUserIdFromToken();

  const toggleSave = async () => {
    const data = {
      id: detailInfo.id,
      name: detailInfo.name,
      addr: detailInfo.addr,
      price: detailInfo.price,
      campImages: Array.isArray(detailInfo.imageUrls)
        ? detailInfo.imageUrls.join(", ")
        : detailInfo.imageUrls,
    };

    console.log("전송하려는 데이터:", JSON.stringify(data, null, 2));
    console.log("찜하려는 campId:", detailInfo.id);

    try {
      const response = await post(
        `userprofile/wishlist/add/${detailInfo.id}/${userId}`,
        data,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
      setIsSaved(!isSaved);
      console.log("찜하기 성공! 😄:", response);
    } catch (error) {
      setError("찜하기 오류 발생 🥲");
      console.error("찜하기 요청 오류🥲:", error);
      if (error.response) {
        console.error("서버 응답 상태 코드:", error.response.status);
        console.error("서버 응답 데이터:", error.response.data);
      } else {
        console.error("요청 오류:", error.message);
      }
    }
  };

  return (
    <div>
      <div className="detail-content underline">
        <div className="rating-and-save-box">
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

          {/* 찜하기 버튼 */}
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
            최대 수용인원: {detailInfo.maxNum}명
          </div>

          <div className="detail-item">
            <ReactSVG
              className="detail-icon"
              src={svg.calculator}
              alt="calculator"
            />
            인당 추가요금 {detailInfo.overCharge?.toLocaleString()}원
          </div>
        </div>
        <ReadMore text={detailInfo.description} maxLength={80} />
      </div>
    </div>
  );
};

export default DetailPageInfo;
