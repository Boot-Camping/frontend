import "../detail-page/DetailPage.css";
import React, { useEffect } from "react";

const KAKAO_MAP_API_KEY = "1d6e7d08ab295cf034bd9d006c34305b";

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}`;
    script.async = true;
    script.onload = () => {
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);
        } else {
          console.error("Kakao Maps API를 로드할 수 없습니다.");
        }
      };
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="map">
      <div className="map-title">지도</div>
      <div id="map" className="map-api"></div>
    </div>
  );
};

export default KakaoMap;
