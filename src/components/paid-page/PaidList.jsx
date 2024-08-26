import React, { useState } from "react";
import "./PaidList.css";
import { paidIcon } from "../../constants/paid";
import { ReactSVG } from "react-svg";
import EmptyContent from "./EmptyContent";
import { shortPeriodHyphen } from "../../utils/shortPeriodHyphen";
import { put } from "../../utils/Api";

const PaidList = ({
  filter,
  paidData,
  setPaidData,
  errorMessage,
  accessToken,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredData =
    filter === "all"
      ? paidData
      : paidData.filter((item) => item.bookStatus === filter);

  const cancelBookingHandle = async (bookingId) => {
    setLoading(true);
    setError("");

    const customHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      await put(
        `book/${bookingId}/${userId}`,
        { bookStatus: "CANCELLED" },
        customHeaders
      );

      setPaidData((prevData) =>
        prevData.filter((item) => item.bookId !== bookingId)
      );
    } catch (err) {
      setError("예약 취소에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (data) => {
    if (data.bookStatus === "BOOKING") {
      return (
        <button
          onClick={() => cancelBookingHandle(data.bookId)}
          disabled={loading}
          className="cancel-button"
        >
          <ReactSVG src={paidIcon.cancel} className="paid-list-img" />
          {loading ? "취소 중..." : "예약 취소"}
        </button>
      );
    } else {
      return (
        <button className="review-button">
          <ReactSVG src={paidIcon.write} className="paid-list-img" />
          리뷰 작성
        </button>
      );
    }
  };

  return (
    <div className="paid-list-wrap">
      {error && <div className="error-message">{error}</div>}
      {filteredData.length > 0 ? (
        filteredData.map((data) => (
          <div
            className={`paid-list ${
              data.bookStatus === "BOOKING" ? "book-list" : "usage-list"
            } `}
            key={data.bookId}
          >
            <div className="paid-list-status">
              <div className="paid-status">
                {data.bookStatus === "BOOKING" ? "예약 완료" : "이용 완료"}
              </div>
              <div className="paid-period">
                <span>{shortPeriodHyphen(data)}</span>
              </div>
            </div>
            <div className="paid-list-price">
              <div>{data.campName}</div>
              <div>{data.totalPrice.toLocaleString()}원</div>
            </div>
            <div className="paid-list-personnel">총 {data.bookNum}명</div>
            <div className="paid-list-request">
              <div>요청 사항</div>
              <div>{data.bookRequest || "없음"}</div>
            </div>
            <div className="paid-list-btn">{renderButton(data)}</div>
          </div>
        ))
      ) : (
        <EmptyContent errorMessage={errorMessage || "결제 내역이 없습니다."} />
      )}
    </div>
  );
};

export default PaidList;

// import React from "react";
// import "./PaidList.css";
// import { paidIcon } from "../../constants/paid";
// import { ReactSVG } from "react-svg";
// import { filterData } from "../../utils/filterData";
// import EmptyContent from "./EmptyContent";
// import { shortPeriodHyphen } from "../../utils/shortPeriodHyphen";

// const PaidList = ({ filter, paidData, errorMessage }) => {
//   const filteredData = filterData(paidData, filter, "bookStatus");

//   const renderButton = (data, index) => {
//     if (data.bookStatus === "BOOKING") {
//       return (
//         <button>
//           <ReactSVG src={paidIcon.cancel} className="paid-list-img" />
//           예약 취소
//         </button>
//       );
//     } else {
//       return (
//         <button>
//           <ReactSVG src={paidIcon.write} className="paid-list-img" />
//           리뷰 작성
//         </button>
//       );
//     }
//   };

//   return (
//     <div className="paid-list-wrap">
//       {paidData.length > 0 && filteredData.length > 0 ? (
//         filteredData.map((data, index) => (
//           <div
//             className={`paid-list ${
//               data.bookStatus === "BOOKING" ? "book-list" : "usage-list"
//             } `}
//             key={`paid-list-${index}`}
//           >
//             <div className="paid-list-status">
//               <div className="paid-status">
//                 {data.bookStatus === "BOOKING" ? "예약 완료" : "이용 완료"}
//               </div>
//               <div className="paid-period">
//                 <span>{shortPeriodHyphen(data)}</span>
//               </div>
//             </div>
//             <div className="paid-list-price">
//               <div>{data.campName}</div>
//               <div>{data.totalPrice.toLocaleString()}원</div>
//             </div>
//             <div className="paid-list-personnel">총 {data.bookNum}명</div>
//             <div className="paid-list-request">
//               <div>요청 사항</div>
//               <div>{data.bookRequest}</div>
//             </div>
//             <div className="paid-list-btn">{renderButton(data, index)}</div>
//           </div>
//         ))
//       ) : (
//         <EmptyContent errorMessage={errorMessage} />
//       )}
//     </div>
//   );
// };

// export default PaidList;
