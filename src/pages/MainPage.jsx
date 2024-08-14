import React from "react";
import MainSlider from "../components/MainSlider";
import MainCategory from "../components/MainCategory";
import MainReview from "../components/MainReview";
import MainCampingList from "../components/MainCampingList";
import Footer from "../components/Footer";

const MainPage = () => {
  return (
    <>
      <MainSlider />
      <MainCategory />
      <MainReview />
      <MainCampingList />
      <Footer />
    </>
  );
};

export default MainPage;
