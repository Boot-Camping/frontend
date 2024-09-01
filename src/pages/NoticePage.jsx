import React, { useEffect, useState } from "react";
import "../components/notice-page/NoticePage.css";
import "../components/notice-page/NoticeFilter.css";
import { useNavigate } from "react-router-dom";
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
  const [noticeData, setNoticeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const size = 8;
  const [totalPages, setTotalPages] = useState(0);

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

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <ReactSVG
          src={pageSvgSrc}
          className="notice-move-prev"
          onClick={() => navigate(-1)}
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

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default NoticePage;
