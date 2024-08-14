import React, { useEffect, useState } from "react";
import useAddress from "../../hooks/useAddress";

const PostCodeApi = ({setPostcode}) => {
  const { postcode } = useAddress();

  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sample6_execDaumPostcode = (event) => {
    event.preventDefault();

    if (isScriptLoaded) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          var addr = "";
          var extraAddr = "";

          if (data.userSelectedType === "R") {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            if (extraAddr !== "") {
              extraAddr = " (" + extraAddr + ")";
            }
            setExtraAddress(extraAddr);
          } else {
            setExtraAddress("");
          }

					console.log("우편번호:", data.zonecode);
					console.log("주소:", addr);

          setPostcode(data.zonecode);
          setAddress(addr);

          document.getElementById("detail-address").focus();
        },
        theme: {
          searchBgColor: "#038153",
          queryTextColor: "#FFFFFF",
          bgColor: "#EAEAEA",
        },
      }).open({
        popupKey: "popup1",
        popupTitle: "우편번호 찾기",
      });
    } else {
      console.error("아직 스크립트가 로드되지 않음");
    }
  };

  return (
    <div className="signup-input-wrap postcode-wrap">
      <div className="postcode-btn-wrap">
        <button
          id="postcode-btn"
          className="postcode-btn"
          onClick={sample6_execDaumPostcode}
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
