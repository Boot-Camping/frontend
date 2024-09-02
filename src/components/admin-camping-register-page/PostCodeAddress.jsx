// import React from "react";
// import useDaumPostCode from "../../hooks/useDaumPostCode";
// import useAddress from "../../hooks/useAddress";

// const PostCodeAddress = () => {
//   const { postcode = "", setPostcode, address = "", setAddress } = useAddress(); // 빈 문자열로 초기화
//   const {
//     address: selectedAddress = "", // 빈 문자열로 초기화
//     detailAddress = "", // 빈 문자열로 초기화
//     setDetailAddress,
//     extraAddress = "", // 빈 문자열로 초기화
//     openPostcodePopup,
//   } = useDaumPostCode(setPostcode);

//   return (
//     <div className="signup-input-wrap postcode-wrap">
//       <div className="postcode-btn-wrap">
//         <button
//           type="button"
//           className="postcode-btn"
//           onClick={openPostcodePopup}
//         >
//           우편번호 찾기
//         </button>
//       </div>

//       <input
//         className="signup-input"
//         type="text"
//         value={postcode}
//         placeholder="우편번호"
//         readOnly
//       />
//       <br />
//       <input
//         type="text"
//         className="signup-input"
//         value={selectedAddress || address}
//         placeholder="주소"
//         readOnly
//       />
//       <br />
//       <input
//         id="detail-address"
//         type="text"
//         className="signup-input"
//         value={detailAddress}
//         placeholder="상세 주소"
//         onChange={(e) => setDetailAddress(e.target.value)}
//       />
//     </div>
//   );
// };

// export default PostCodeAddress;

import React from "react";
import useDaumPostCode from "../../hooks/useDaumPostCode";
import useAddress from "../../hooks/useAddress";

const PostCodeAddress = () => {
  const { postcode = "", setPostcode, address = "", setAddress } = useAddress(); // 빈 문자열로 초기화
  const {
    address: selectedAddress = "", // 빈 문자열로 초기화
    detailAddress = "", // 빈 문자열로 초기화
    setDetailAddress,
    extraAddress = "", // 빈 문자열로 초기화
    openPostcodePopup,
  } = useDaumPostCode(setPostcode);

  // 선택된 주소와 상세주소가 변경될 때 addr도 업데이트
  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  return (
    <div className="signup-input-wrap postcode-wrap">
      <div className="postcode-btn-wrap">
        <button
          type="button"
          className="postcode-btn"
          onClick={openPostcodePopup}
        >
          우편번호 찾기
        </button>
      </div>

      <input
        className="signup-input"
        type="text"
        value={postcode}
        placeholder="우편번호"
        readOnly
      />
      <br />
      <input
        type="text"
        className="signup-input"
        value={selectedAddress || address}
        placeholder="주소"
        readOnly
      />
      <br />
      <input
        id="detail-address"
        type="text"
        className="signup-input"
        value={detailAddress}
        placeholder="상세 주소"
        onChange={handleDetailAddressChange} // 상세주소 변경 핸들러 연결
      />
    </div>
  );
};

export default PostCodeAddress;
