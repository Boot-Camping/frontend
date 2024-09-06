import React, { useEffect } from "react";
import "./DaumPostCode.css";
import useDaumPostCode from "../../hooks/useDaumPostCode";

const DaumPostCode = ({
  postcode,
  setPostcode,
  addressRef,
  detailAddressRef,
}) => {
  const {
    address,
    detailAddress,
    setDetailAddress,
    extraAddress,
    openPostcodePopup,
  } = useDaumPostCode(setPostcode);

  useEffect(() => {
    if (address) {
      addressRef.current.value = address;
    }
  }, [address, addressRef]);

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
        defaultValue={addressRef.current?.value}
        placeholder="주소"
        readOnly
        ref={addressRef}
      />
      <br />
      <input
        id="detail-address"
        className="signup-input"
        type="text"
        defaultValue={detailAddressRef.current?.value}
        placeholder="상세주소"
        onChange={(e) => setDetailAddress(e.target.value)}
        required
        ref={detailAddressRef}
      />
    </div>
  );
};

export default DaumPostCode;
