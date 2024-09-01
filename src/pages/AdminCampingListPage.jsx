import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "../components/admin-camping-register-page/AdminCampingList.css";
import "../components/main-page/MainCampingList.css";
import useFetchCampingList from "../hooks/useFetchCampingList";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";

const AdminCampingListPage = () => {
  const { campingPlaces, error } = useFetchCampingList();
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(campingPlaces);

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
    </div>
  );
};

export default AdminCampingListPage;
