import React from "react";
import "../components/save-page/SavePage.css";
import { saveIcon } from "../constants/save";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SaveList from "../components/save-page/SaveList";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";

const SavePage = () => {
  return (
    <section className="save-wrap">
      <div className="save-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={saveIcon.prev} className="save-move-prev" />
        </Link>
        <div>찜 목록</div>
      </div>

      <SaveList />

      <SaveMoreBtn />
    </section>
  );
};

export default SavePage;
