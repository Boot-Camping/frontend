import React, { useEffect } from "react";
import "../detail-page/DetailPage.css"; // CSS 파일 경로

const KAKAO_MAP_API_KEY = "1d6e7d08ab295cf034bd9d006c34305b";

const KakaoMap = ({ address }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addressCoords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              const mapContainer = document.getElementById("map");
              const mapOptions = {
                center: addressCoords, // 검색된 주소를 중심으로 설정
                level: 4,
              };
              const map = new window.kakao.maps.Map(mapContainer, mapOptions);

              // SVG를 문자열로 변환
              const svgString = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
                  <style>
                    .marker-icon { fill: #f43c3c; stroke: black; stroke-width: 1px; }
                  </style>
                  <path class="marker-icon" fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                </svg>`;

              const csSvgString = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
                  <style>
                    .marker-icon { fill: #038153; stroke: black; stroke-width: 1px; }
                  </style>
                  <path class="marker-icon" fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                </svg>`;

              const svgURL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                svgString
              )}`;

              const csSvgURL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                csSvgString
              )}`;

              const imageSize = new window.kakao.maps.Size(32, 35);

              const markerImage = new window.kakao.maps.MarkerImage(
                svgURL,
                imageSize
              );

              const csMarkerImage = new window.kakao.maps.MarkerImage(
                csSvgURL,
                imageSize
              );

              const currentMarker = new window.kakao.maps.Marker({
                map: map,
                position: addressCoords,
                image: markerImage,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: '<div className="current-window">현재 위치</div>',
              });
              infowindow.open(map, currentMarker);

              const places = new window.kakao.maps.services.Places();

              const callback = (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const bounds = new window.kakao.maps.LatLngBounds();
                  const markers = [];
                  const infowindows = [];

                  data.forEach((item) => {
                    const position = new window.kakao.maps.LatLng(
                      item.y,
                      item.x
                    );
                    const marker = new window.kakao.maps.Marker({
                      position: position,
                      image: csMarkerImage,
                      map: map,
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
                location: addressCoords,
                radius: 1000,
              });

              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const currentCoords = new window.kakao.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                  );

                  const currentMarker = new window.kakao.maps.Marker({
                    map: map,
                    position: currentCoords,
                    image: csMarkerImage,
                  });

                  const currentInfowindow = new window.kakao.maps.InfoWindow({
                    content: '<div className="current-window">현재 위치</div>',
                  });
                  currentInfowindow.open(map, currentMarker);
                });
              }
            }
          });
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <>
      <div id="map" className="map-api"></div>
    </>
  );
};

export default KakaoMap;
