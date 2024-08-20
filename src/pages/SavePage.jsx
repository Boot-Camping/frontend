import React, { useState } from "react";
import "../components/save-page/SavePage.css";
import { saveData, saveIcon } from "../constants/save";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SaveList from "../components/save-page/SaveList";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";

const SavePage = () => {
  const [visibleItems, setVisibleItems] = useState(4);

  const loadMore = () => {
    setVisibleItems(visibleItems + 4);
  };

  const hasMoreItems = visibleItems < saveData.length;

  return (
    <section className="save-wrap">
      <div className="save-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={saveIcon.prev} className="save-move-prev" />
        </Link>
        <div>찜 목록</div>
      </div>

      <SaveList visibleItems={visibleItems} saveData={saveData} />

      <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
    </section>
  );
};

export default SavePage;
