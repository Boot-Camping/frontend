import React from "react";
import MainSlider from "../components/main-page/MainSlider";
import MainCategory from "../components/main-page/MainCategory";
import MainReview from "../components/main-page/MainReview";
import MainCampingList from "../components/main-page/MainCampingList";

const MainPage = () => {
  return (
    <>
      <MainSlider />
      <MainCategory />
      <MainReview />
      <MainCampingList />
    </>
  );
};

export default MainPage;
