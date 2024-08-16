import "../detail-page/DetailPage.css";
import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    // 카카오 지도 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_MAP_API_KEY%&autoload=false`;
    script.async = true;
    script.onload = () => {
      // API 로드 후에 kakao 객체 사용 가능
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);
      }
    };

    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="map">
      <div className="map-title">지도</div>
      <div className="map-api"></div>
    </div>
  );
};

export default KakaoMap;
