import React, { useEffect } from "react";
import "../detail-page/DetailPage.css";

const KAKAO_MAP_API_KEY = "1d6e7d08ab295cf034bd9d006c34305b";

const KakaoMapContainer = ({ onMapLoad, addressCoords }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById("map");
          const mapOptions = {
            center: addressCoords, // 검색된 주소를 중심으로 설정
            level: 4,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOptions);
          onMapLoad(map);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [addressCoords, onMapLoad]);

  return (
    <div
      id="map"
      className="map-api"
      style={{ width: "100%", height: "400px" }}
    />
  );
};

export default KakaoMapContainer;
