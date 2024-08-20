import React, { useEffect } from "react";

const KakaoMapUserLocationMarker = ({ map, svgString }) => {
  useEffect(() => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentCoords = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const svgURL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          svgString
        )}`;
        const imageSize = new window.kakao.maps.Size(32, 35);

        const markerImage = new window.kakao.maps.MarkerImage(
          svgURL,
          imageSize
        );

        const marker = new window.kakao.maps.Marker({
          map,
          position: currentCoords,
          image: markerImage,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content:
            '<div style="padding: 2px; font-size: 12px;">현재 위치</div>',
        });
        infowindow.open(map, marker);
      });
    }
  }, [map, svgString]);

  return null;
};

export default KakaoMapUserLocationMarker;
