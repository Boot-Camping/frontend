import React, { useEffect, useState } from "react";
import "../components/save-page/SavePage.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SaveList from "../components/save-page/SaveList";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";
import { svgCollection } from "../constants/svgCollection";

const SavePage = () => {
  const { accessToken } = getUserIdFromToken();
  const [saveData, setSaveData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(4, saveData);

  const getSaveData = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      const response = await get(`userprofile/wishlist`, customHeaders);
      setSaveData(response);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getSaveData();
  }, []);

  return (
    <section className="save-wrap">
      <div className="save-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={svgCollection.prev} className="save-move-prev" />
        </Link>
        <div>찜 목록</div>
      </div>

      <SaveList
        visibleItems={visibleItems}
        saveData={saveData}
        errorMessage={errorMessage}
        onUpdate={getSaveData}
      />

      <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
    </section>
  );
};

export default SavePage;
