export const loadDaumPostCode = () => {
  const script = document.createElement("script");
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
};

export const openPostcodePopup = (setAddress, setPostcode, setExtraAddress) => {
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
};
