import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { filterData } from "../utils/filterData";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../constants/notice";
import useFetchCampingList from "../hooks/useFetchCampingList";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";

const AdminCampingListPage = () => {
  const { campingPlaces, error } = useFetchCampingList();
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

  const [filter, setFilter] = useState("all");
  const filteredItems = filterData(noticeData, filter, "noticeStatus");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
    3,
    filteredItems
  );

  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {error.message}</div>;
  }

  return (
    <div>
      <AdminMainLink />
      <div className="admin-camping-list-title">캠핑장 리스트</div>
      <div className="admin-camping-list-wrapper">
        {campingPlaceFiltered.map((campingPlace) => (
          <div key={campingPlace.id} className="camping-list">
            <Link to={`/admin/camp-fix/${campingPlace.id}`}>
              <div className="admin-camping-name-list">
                <div>
                  {campingPlace.name}{" "}
                  <div className="admin-camping-date-list">
                    {campingPlace.createdAt}
                  </div>
                </div>
                <ReactSVG
                  className="list-pencil"
                  src="../../src/assets/svg/pencil.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      {hasMoreItems && (
        <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
      )}
    </div>
  );
};

export default AdminCampingListPage;
