import React, { useEffect, useState } from "react";
import "../components/save-page/SavePage.css";
import { saveData, saveIcon } from "../constants/save";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SaveList from "../components/save-page/SaveList";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/Api";

const SavePage = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [saveData, setSaveData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(4, saveData);

  useEffect(() => {
    const getSaveData = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await get(
          `userprofile/wishlist/${userId}`,
          customHeaders
        );
        setSaveData(response);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getSaveData();
  }, []);

  return (
    <section className="save-wrap">
      <div className="save-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={saveIcon.prev} className="save-move-prev" />
        </Link>
        <div>찜 목록</div>
      </div>

      <SaveList
        visibleItems={visibleItems}
        saveData={saveData}
        errorMessage={errorMessage}
      />

      <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
    </section>
  );
};

export default SavePage;
