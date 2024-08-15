import React from "react";
import DetailPageInfo from "./DetailPageInfo";
import ReviewPage from "../components/ReviewPage";
import BookButton from "../components/BookButton";
import ImageSlider from "../components/imageSlider/ImageSlider";
import { sliderData } from "../constants/sliderData";

import "../css/DetailPage.css";

const DetailPage = () => {
  return (
    <div className="detail-page">
      <ImageSlider sliderData={sliderData} />
      <DetailPageInfo />
      <ReviewPage />
      <BookButton to="/book" />
    </div>
  );
};

export default DetailPage;
