import React from "react";
import "../components/save-page/SavePage.css";
import { saveData, saveIcon } from "../constants/save";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SaveList from "../components/save-page/SaveList";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";

const SavePage = () => {
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(4, saveData);

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
