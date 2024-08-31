import React from "react";
import { Link } from "react-router-dom";
import { svgCollection } from "../constants/svgCollection";
import "../components/admin-notice-register/AdminNoticeListPage.css";
import AdminMainLink from "../components/admin-camping-register-page/AdminMainLink";
import NoticePage from "./NoticePage";

const AdminNoticeListPage = () => {
  return (
    <div>
      <AdminMainLink />
      <div className="notice-regi-btn">
        <Link to={"/admin/notice-regi"}>
          <button className="notice-register-btn">+ 등록</button>
        </Link>
      </div>
      <NoticePage
        linkPrefix="/admin/notice-fix"
        listSvgSrc={svgCollection.pencilSolid} // NoticeList에서 사용할 SVG
        pageSvgSrc={svgCollection.prev} // NoticePage에서 사용할 SVG
      />
    </div>
  );
};

export default AdminNoticeListPage;
