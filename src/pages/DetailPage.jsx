import React from "react";

import ImageSlider from "../components/ImageSlider";
import DetailPageInfo from "./DetailPageInfo";
import ReviewPage from "../components/ReviewPage";
import BookButton from "../components/BookButton";
import "../css/DetailPage.css";

const DetailPage = () => {
  return (
    <>
      <div className="detail-page">
        <ImageSlider />
        <DetailPageInfo />
        <ReviewPage />
        <BookButton />
      </div>
    </>
  );
};

export default DetailPage;
