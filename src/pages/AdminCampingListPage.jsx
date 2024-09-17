import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import useFetchCampingList from "../hooks/useFetchCampingList"; // useFetchCampingList 훅 불러오기
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import Pagination from "../components/common/Pagination";
import { svgCollection } from "../constants/svgCollection";
import "../components/admin-camping-register-page/AdminCampingList.css";
import "../components/main-page/MainCampingList.css";
import "../components/admin-notice-register/AdminNoticeListPage.css";

const AdminCampingListPage = () => {
  const [page, setPage] = useState(0); // 현재 페이지 상태
  const [pageSize] = useState(10); // 페이지당 항목 수

  // useFetchCampingList 훅 호출하여 데이터를 가져옴
  const { campingPlaces, error, totalPages } = useFetchCampingList(
    page,
    pageSize
  );

  // 에러 발생 시 메시지 출력
  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {error}</div>;
  }

  return (
    <div>
      <AdminMainLink />
      <div className="admin-camping-list-title">캠핑장 리스트</div>
      <div className="admin-camping-list-wrapper">
        {campingPlaces.map((campingPlace) => (
          <div key={campingPlace.id} className="camping-list">
            <Link to={`/admin/camp-fix/${campingPlace.id}`}>
              <div className="admin-camping-name-list">
                <div>
                  {campingPlace.name}
                  <div className="admin-camping-date-list">
                    {new Date(campingPlace.createdAt).toLocaleDateString()}{" "}
                  </div>
                </div>
                <ReactSVG
                  className="list-pencil"
                  src={svgCollection.pencilSolid}
                  alt="edit icon"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminCampingListPage;
