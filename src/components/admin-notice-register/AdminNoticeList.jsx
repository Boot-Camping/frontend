// import React from "react";
// import { Link } from "react-router-dom";
// import { shortDateDot } from "../../utils/shortDateDot";
// import { ReactSVG } from "react-svg";
// import { filterData } from "../../utils/filterData";
// import { noticeDetailData } from "../../constants/notice";

// const AdminNoticeList = ({ visibleItems, noticeData, filter }) => {
//   const filteredData = filterData(noticeData, filter, "noticeStatus");

//   return (
//     <div className="notice-list-wrap">
//       {filteredData.slice(0, visibleItems).map((data, index) => (
//         <Link to={"/admin/notice-fix"} className="notice-list">
//           <div className="notice-info">
//             <div className="notice-list-title">
//               <div
//                 className={`notice-status ${
//                   data.noticeStatus === "이벤트" ? "notice-event" : ""
//                 }`}
//               >
//                 {data.noticeStatus}
//               </div>
//               <div>{data.title}</div>
//             </div>
//             <div className="notice-date">{shortDateDot(data)}</div>
//           </div>
//           <ReactSVG
//             className="list-pencil"
//             src="../../src/assets/svg/pencil.svg"
//             alt=""
//           />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default AdminNoticeList;

import React from "react";
import { Link } from "react-router-dom";
import { shortDateDot } from "../../utils/shortDateDot";
import { ReactSVG } from "react-svg";
import { filterData } from "../../utils/filterData";

const AdminNoticeList = ({ visibleItems, noticeData, filter }) => {
  const filteredData = filterData(noticeData, filter, "noticeStatus");

  return (
    <div className="notice-list-wrap">
      {filteredData.slice(0, visibleItems).map((data, index) => (
        <Link
          to={`/admin/notice-fix/${data.id}`} // 공지사항 ID를 포함한 경로로 이동
          className="notice-list"
          key={data.id} // key 추가
        >
          <div className="notice-info">
            <div className="notice-list-title">
              <div
                className={`notice-status ${
                  data.noticeStatus === "이벤트" ? "notice-event" : ""
                }`}
              >
                {data.noticeStatus}
              </div>
              <div>{data.title}</div>
            </div>
            <div className="notice-date">{shortDateDot(data)}</div>
          </div>
          <ReactSVG
            className="list-pencil"
            src="../../src/assets/svg/pencil.svg"
            alt=""
          />
        </Link>
      ))}
    </div>
  );
};

export default AdminNoticeList;
