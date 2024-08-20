import React, { useEffect } from "react";

const KakaoMapMarker = ({ map, position, svgString, content }) => {
  useEffect(() => {
    if (map && position) {
      const svgURL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        svgString
      )}`;
      const imageSize = new window.kakao.maps.Size(32, 35);

      const markerImage = new window.kakao.maps.MarkerImage(svgURL, imageSize);
      const marker = new window.kakao.maps.Marker({
        map,
        position,
        image: markerImage,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding: 2px; font-size: 12px;">${content}</div>`,
      });
      infowindow.open(map, marker);
    }
  }, [map, position, svgString, content]);

  return null;
};

export default KakaoMapMarker;
