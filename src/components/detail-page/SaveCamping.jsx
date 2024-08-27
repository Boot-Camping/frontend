import React from "react";
import "../detail-page/DetailPage.css";
import { svgCollection } from "../../constants/svgCollection";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import axios from "axios";
import { post } from "../../utils/api";

const SaveCamping = ({ campId }) => {
  const svg = svgCollection;
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);

  const toggleSave = async () => {
    try {
      axios.post("userprofile/wishlist/add/{campId}/{userId}");
      setIsSaved(!isSaved);
      console.log("찜하기 성공! 😄:", response.data);
    } catch (error) {
      setError("찜하기 오류 발생 🥲");
      console.error("찜하기 요청 오류:", error);
    }
  };

  return (
    <div>
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
        {error && <p className="error-message">{error}</p>}
      </button>
    </div>
  );
};

export default SaveCamping;
