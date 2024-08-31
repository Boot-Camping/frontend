import React from "react";
import useDaumPostCode from "../../hooks/useDaumPostCode";
import useAddress from "../../hooks/useAddress";

const PostCodeAddress = () => {
  const { postcode, setPostcode, address, setAddress } = useAddress();
  const {
    address: selectedAddress,
    detailAddress,
    setDetailAddress,
    extraAddress,
    openPostcodePopup,
  } = useDaumPostCode(setPostcode);

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
        onChange={(e) => setDetailAddress(e.target.value)}
      />
    </div>
  );
};

export default PostCodeAddress;
