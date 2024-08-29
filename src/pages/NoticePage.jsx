// import React, { useEffect, useState } from "react";
// import "../components/notice-page/NoticePage.css";
// import "../components/notice-page/NoticeFilter.css";
// import { Link } from "react-router-dom";
// import { ReactSVG } from "react-svg";
// import NoticeList from "../components/notice-page/NoticeList";
// import { svgCollection } from "../constants/svgCollection";
// import Filter from "../components/common/Filter";
// import { filterType } from "../constants/filterType";
// import { get } from "../utils/api";
// import Pagination from "../components/common/Pagination";

// const NoticePage = () => {
//   const [noticeData, setNoticeData] = useState([]);
//   const [page, setPage] = useState(0);
//   const size = 8;
//   const [totalPages, setTotalPages] = useState(0);
//   // const [filter, setFilter] = useState("all");

//   // const filterChangeHandle = (status) => {
//   //   setFilter(status);
//   // };

//   useEffect(() => {
//     const getNoticeData = async () => {
//       const customHeaders = {
//         "Content-Type": "application/x-www-form-urlencoded",
//       };

//       const params = {
//         page: page,
//         size: size,
//       };

//       const queryString = new URLSearchParams(params).toString();

//       try {
//         const response = await get(
//           `admin/notice/all?${queryString}`,
//           customHeaders
//         );
//         setNoticeData(response.content);
//         console.log(response.content);
//         setTotalPages(response.totalPages);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     getNoticeData();
//   }, [page]);

//   return (
//     <section className="notice-page-wrap">
//       <div className="notice-title-wrap">
//         <Link to={"/mypage"}>
//           <ReactSVG src={svgCollection.prev} className="notice-move-prev" />
//         </Link>
//         <div>공지사항</div>
//       </div>

//       {/* <Filter
//         filterChangeHandle={filterChangeHandle}
//         filterType={filterType.notice}
//         wrapClassName="notice-page-filter"
//         allClassName="event-filter"
//       /> */}

//       <NoticeList
//         noticeData={noticeData}
//         // filter={filter}
//       />

//       <Pagination page={page} setPage={setPage} totalPages={totalPages} />
//     </section>
//   );
// };

// export default NoticePage;

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
  listSvgSrc = svgCollection.prev, // NoticeList에서 사용할 SVG
  pageSvgSrc = svgCollection.prev, // NoticePage에서 사용할 SVG
}) => {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState([]);
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
        console.log(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log(error.message);
      }
    };

    getNoticeData();
  }, [page]);

  return (
    <section className="notice-page-wrap">
      <div className="notice-title-wrap">
        <ReactSVG
          src={pageSvgSrc} // NoticePage에서 사용하는 SVG
          className="notice-move-prev"
          onClick={() => navigate(-1)}
        />
        <div>공지사항</div>
      </div>

      <NoticeList
        noticeData={noticeData}
        linkPrefix={linkPrefix}
        svgSrc={listSvgSrc} // NoticeList에서 사용하는 SVG
      />

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
};

export default NoticePage;
