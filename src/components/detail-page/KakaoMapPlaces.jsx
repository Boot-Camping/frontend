import React, { useEffect } from "react";

const KakaoMapPlaces = ({ map, location, svgString }) => {
  useEffect(() => {
    if (map && location) {
      const places = new window.kakao.maps.services.Places();
      const svgURL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        svgString
      )}`;
      const imageSize = new window.kakao.maps.Size(32, 35);

      const markerImage = new window.kakao.maps.MarkerImage(svgURL, imageSize);

      const callback = (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const markers = [];
          const infowindows = [];

          data.forEach((item) => {
            const position = new window.kakao.maps.LatLng(item.y, item.x);
            const marker = new window.kakao.maps.Marker({
              position,
              image: markerImage,
              map,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding: 2px; font-size: 12px; display: inline-block;">${item.place_name}</div>`,
            });

            markers.push(marker);
            infowindows.push(infowindow);

            bounds.extend(position);
          });

          map.setBounds(bounds);

          const displayInfowindows = () => {
            const level = map.getLevel();
            markers.forEach((marker, index) => {
              if (level <= 3) {
                infowindows[index].open(map, marker);
              } else {
                infowindows[index].close();
              }
            });
          };

          displayInfowindows();
          window.kakao.maps.event.addListener(
            map,
            "zoom_changed",
            displayInfowindows
          );
        }
      };

      places.keywordSearch("편의점", callback, {
        location,
        radius: 1000,
      });
    }
  }, [map, location, svgString]);

  return null;
};

export default KakaoMapPlaces;
