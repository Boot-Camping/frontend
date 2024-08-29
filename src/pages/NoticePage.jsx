import React, { useEffect, useState } from "react";
import "../components/notice-page/NoticePage.css";
import "../components/notice-page/NoticeFilter.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import NoticeList from "../components/notice-page/NoticeList";
import { svgCollection } from "../constants/svgCollection";
import Filter from "../components/common/Filter";
import { filterType } from "../constants/filterType";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const NoticePage = () => {
  const { accessToken } = getUserIdFromToken();
  const [noticeData, setNoticeData] = useState([]);
  const [page, setPage] = useState(0);
  const size = 8;
  // const [filter, setFilter] = useState("all");

  // const filterChangeHandle = (status) => {
  //   setFilter(status);
  // };

  useEffect(() => {
    const getNoticeData = async () => {
      const customHeaders = {
        Authorization: accessToken,
        // "Content-Type": "application/x-www-form-urlencoded",
        // params: {
        //   page: page,
        //   size: size,
        // },
      };

      try {
        const response = await get(`admin/notice/all`);
        setNoticeData(response.content);
        console.log(response.content);
      } catch (error) {
        console.log(error.message);
      }
    };

    getNoticeData();
  }, [page]);

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={svgCollection.prev} className="notice-move-prev" />
        </Link>
        <div>공지사항 및 이벤트</div>
      </div>

      {/* <Filter
        filterChangeHandle={filterChangeHandle}
        filterType={filterType.notice}
        wrapClassName="notice-page-filter"
        allClassName="event-filter"
      /> */}

      <NoticeList
        noticeData={noticeData}
        // filter={filter}
      />
    </section>
  );
};

export default NoticePage;
