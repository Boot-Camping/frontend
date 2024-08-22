import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { saveData } from "../constants/save";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";

const AdminCampingListPage = () => {
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(saveData);
  return (
    <div>
      <Link to={"/admin"}>
        <ReactSVG
          className="admin-home-icon"
          src="../../src/assets/svg/home.svg"
          alt=""
        />
      </Link>
      <div className="admin-camping-list-title">캠핑장 리스트</div>
      <div className="admin-camping-list-wraper">
        {campingPlaceFiltered.map((campingPlace) => (
          <div key={campingPlace.id} className="camping-list">
            <Link to={`/admin/camp-fix/${campingPlace.id}`}>
              <div className="admin-camping-name-list">
                <div>{campingPlace.campName}</div>
                <div className="admin-camping-date-list">
                  {campingPlace.onDate}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCampingListPage;
