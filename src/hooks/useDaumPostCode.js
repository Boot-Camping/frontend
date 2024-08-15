import React, { useEffect, useState } from "react";

const useDaumPostCode = (setPostcode) => {
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

  const openPostcodePopup = (event) => {
    event.preventDefault();

    if (isScriptLoaded) {
      new window.daum.Postcode({
        oncomplete: function (data) {
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

  return {
    address,
    detailAddress,
    setDetailAddress,
    extraAddress,
    openPostcodePopup,
  };
};

export default useDaumPostCode;
