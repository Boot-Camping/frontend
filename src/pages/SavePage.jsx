import "../components/save-page/SavePage.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import SaveList from "../components/save-page/SaveList";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import { useLoadMore } from "../hooks/useLoadMore";
import { svgCollection } from "../constants/svgCollection";
import useSave from "../hooks/useSave";

const SavePage = () => {
  const { saveData, errorMessage, getSaveData } = useSave();
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(10, saveData);

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
