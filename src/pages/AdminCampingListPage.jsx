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
      <div className="camping-title">캠핑장 리스트</div>
      <div className="camping-list-wraper">
        {campingPlaceFiltered.map((campingPlace) => (
          <div key={campingPlace.id} className="camping-list">
            <Link to={`/admin/camp-fix/${campingPlace.id}`}>
              <img
                className="camping-img"
                src={campingPlace.campImage}
                alt=""
              />
              <div className="camping-name">{campingPlace.campName}</div>
              <div className="camping-sub-title-wraper">
                <div className="camping-type">{campingPlace.addr}</div>
                <div className="camping-price">{campingPlace.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCampingListPage;
