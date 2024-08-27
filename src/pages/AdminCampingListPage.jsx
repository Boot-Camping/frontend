// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ReactSVG } from "react-svg";
// import { filterData } from "../utils/filterData";
// import { useLoadMore } from "../hooks/useLoadMore";
// import { noticeData } from "../constants/notice";
// import useAllCampInfo from "../hooks/useAllCampInfo";
// import useCampInfo from "../hooks/useCampInfo";
// import SaveMoreBtn from "../components/save-page/SaveMoreBtn";

// const AdminCampingListPage = () => {
//   const [filter, setFilter] = useState("all");
//   const filteredItems = filterData(noticeData, filter, "noticeStatus");
//   const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
//     3,
//     filteredItems
//   );
//   const { campInfos, loading, error } = useAllCampInfo(); // campId 제거

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>캠핑장 정보 가져오기 실패: {error.message}</div>;
//   }

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
//         {campInfos.map((campInfo) => (
//           <div key={campInfo.id} className="camping-list">
//             <Link to={`/admin/camp-fix/${campInfo.id}`}>
//               <div className="admin-camping-name-list">
//                 <div>
//                   {campInfo.name}{" "}
//                   <div className="admin-camping-date-list">
//                     {campInfo.createdAt}
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
//       {hasMoreItems && (
//         <SaveMoreBtn onClick={loadMore} hasMoreItems={hasMoreItems} />
//       )}
//     </div>
//   );
// };

// export default AdminCampingListPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { saveData } from "../mock/saveData";
import { filterData } from "../utils/filterData";
import { useLoadMore } from "../hooks/useLoadMore";
import { noticeData } from "../mock/noticeData";
import SaveMoreBtn from "../components/save-page/SaveMoreBtn";
import useCampingPlaceFilter from "../hooks/useCampingPlaceFilter";

const AdminCampingListPage = () => {
  const { selectedFilter, setSelectedFilter, campingPlaceFiltered } =
    useCampingPlaceFilter(saveData);
  const [filter, setFilter] = useState("all");
  const filteredItems = filterData(noticeData, filter, "noticeStatus");
  const { visibleItems, loadMore, hasMoreItems } = useLoadMore(
    3,
    filteredItems
  );
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
