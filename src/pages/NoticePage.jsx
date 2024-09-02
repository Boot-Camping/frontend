import React, { useEffect, useState } from "react";
import "../components/notice-page/NoticePage.css";
import "../components/notice-page/NoticeFilter.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import NoticeList from "../components/notice-page/NoticeList";
import { svgCollection } from "../constants/svgCollection";
import { get } from "../utils/api";
import Pagination from "../components/common/Pagination";

const NoticePage = ({
  linkPrefix = "/notice",
  listSvgSrc = svgCollection.prev,
  pageSvgSrc = svgCollection.prev,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noticeData, setNoticeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const size = 8;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromQuery = parseInt(params.get("page"), 10);
    console.log(location);

    if (!isNaN(pageFromQuery)) {
      setPage(pageFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const getNoticeData = async () => {
      const customHeaders = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const params = {
        page: page,
        size: size,
      };

      const queryString = new URLSearchParams(params).toString();

      try {
        const response = await get(
          `admin/notice/all?${queryString}`,
          customHeaders
        );
        setNoticeData(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getNoticeData();
  }, [page]);

  const movePrevHandle = () => {
    if (linkPrefix === "/notice") {
      navigate("/mypage");
    } else if (location.pathname === "/admin/notice-list") {
      navigate("/admin");
    }
  };

  const pageChangeHandle = (newPage) => {
    setPage(newPage);
    if (linkPrefix === "/notice") {
      navigate(`${linkPrefix}?page=${newPage}`);
    } else if (location.pathname === "/admin/notice-list") {
      navigate(`/admin/notice-list?page=${newPage}`);
    }
  };

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <ReactSVG
          src={pageSvgSrc}
          className="notice-move-prev"
          onClick={movePrevHandle}
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
          setPage={pageChangeHandle}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

export default NoticePage;
