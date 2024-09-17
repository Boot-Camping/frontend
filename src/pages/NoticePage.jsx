import React, { useEffect, useState } from "react";
import "../components/notice-page/NoticePage.css";
import "../components/notice-page/NoticeFilter.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import NoticeList from "../components/notice-page/NoticeList";
import { svgCollection } from "../constants/svgCollection";
import { get } from "../utils/api";
import Pagination from "../components/common/Pagination";
import useNotice from "../hooks/useNotice";

const NoticePage = ({
  linkPrefix = "/notice",
  listSvgSrc = svgCollection.prev,
  pageSvgSrc = svgCollection.prev,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const size = 8;

  const { noticeData, errorMessage, totalPages } = useNotice(page, size);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromQuery = parseInt(params.get("page"), 10);

    if (!isNaN(pageFromQuery)) {
      setPage(pageFromQuery);
    }
  }, [location.search]);

  const navigateBackHandle = () => {
    if (linkPrefix === "/notice") {
      navigate("/mypage");
    } else if (location.pathname === "/admin/notice-list") {
      navigate("/admin");
    }
  };

  const changePageHandle = (newPage) => {
    setPage(newPage);
    const newPath =
      linkPrefix === "/notice"
        ? `${linkPrefix}?page=${newPage}`
        : `/admin/notice-list?page=${newPage}`;
    navigate(newPath);
  };

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <ReactSVG
          src={pageSvgSrc}
          className="notice-move-prev"
          onClick={navigateBackHandle}
        />
        <div>공지사항</div>
      </div>

      <div className="notice-content">
        <NoticeList
          noticeData={noticeData}
          errorMessage={errorMessage}
          linkPrefix={linkPrefix}
          svgSrc={listSvgSrc}
        />

        <Pagination
          page={page}
          setPage={changePageHandle}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

export default NoticePage;
