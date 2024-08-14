import React, { useEffect, useState } from "react";
import {
  loadDaumPostCode,
  openPostcodePopup,
} from "../../utils/daumPostCodeUtils";

const PostCodeApi = ({ postcode, setPostcode }) => {
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  useEffect(() => {
    const cleanup = loadDaumPostCode();
    return () => {
      cleanup();
    };
  }, []);

  const postcodeSearchHandle = () => {
    openPostcodePopup(setAddress, setPostcode, setExtraAddress);
  };

  return (
    <div className="signup-input-wrap postcode-wrap">
      <div className="postcode-btn-wrap">
        <button
          id="postcode-btn"
          className="postcode-btn"
          onClick={postcodeSearchHandle}
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

export default PostCodeApi;
