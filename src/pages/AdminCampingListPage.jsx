import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { saveData } from "../constants/save";
import { filterData } from "../utils/filterData";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../constants/notice";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";

const AdminCampingListPage = () => {
  const [filter, setFilter] = useState("all");
  const filteredItems = filterData(noticeData, filter, "noticeStatus");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
    3,
    filteredItems
  );
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
                <div>
                  {campingPlace.campName}{" "}
                  <div className="admin-camping-date-list">
                    {campingPlace.onDate}
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

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { get } from "../utils/Api"; // API 호출 함수
// import { ReactSVG } from "react-svg";
// import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";
// import SaveMoreBtn from "../components/save-page/SaveMoreBtn"; // 필요에 따라 컴포넌트 수정

// const AdminCampingListPage = () => {
//   const [campingPlaces, setCampingPlaces] = useState([]);

//   const fetchCampingPlaces = async () => {
//     try {
//       const data = await get("camp"); // 엔드포인트 /api/camp 호출
//       setCampingPlaces(
//         data.map(({ name, createdAt }) => ({ name, createdAt }))
//       );
//     } catch (error) {
//       console.error("Error fetching camping places: ", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchCampingPlaces();
//   }, []);

//   return (
//     <div>
//       <Link to={"/admin"}>
//         <ReactSVG
//           className="admin-home-icon"
//           src="../../src/assets/svg/home.svg"
//           alt=""
//         />
//       </Link>
//       <div className="admin-camping-list-title">캠핑장 리스트</div>
//       <div className="admin-camping-list-wrapper">
//         {campingPlaces.map((campingPlace) => (
//           <div key={campingPlace.id} className="camping-list">
//             <Link to={`/admin/camp-fix/${campingPlace.id}`}>
//               <div className="admin-camping-name-list">
//                 <div>
//                   {campingPlace.name}{" "}
//                   <div className="admin-camping-date-list">
//                     {campingPlace.createdAt}
//                   </div>
//                 </div>
//                 <ReactSVG
//                   className="list-pencil"
//                   src="../../src/assets/svg/pencil.svg"
//                   alt=""
//                 />
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminCampingListPage;
