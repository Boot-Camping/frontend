import React from "react";
import useDaumPostCode from "../../hooks/useDaumPostCode";

const DaumPostCode = ({ postcode, setPostcode }) => {
  const {
    address,
    detailAddress,
    setDetailAddress,
    extraAddress,
    openPostcodePopup,
  } = useDaumPostCode(setPostcode);

  return (
    <div className="signup-input-wrap postcode-wrap">
      <div className="postcode-btn-wrap">
        <button
          id="postcode-btn"
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
        className="signup-input"
        type="text"
        value={address}
        placeholder="주소"
        readOnly
      />
      <br />
      <input
        id="detail-address"
        className="signup-input"
        type="text"
        value={detailAddress}
        placeholder="상세주소"
        onChange={(e) => setDetailAddress(e.target.value)}
        required
      />
      <br />
      <input
        className="signup-input"
        type="text"
        value={extraAddress}
        placeholder="참고항목"
        readOnly
      />
    </div>
  );
};

export default DaumPostCode;
