import "../detail-page/DetailPage.css";
import React, { useEffect } from "react";

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
                center: addressCoords,
                level: 4,
              };
              const map = new window.kakao.maps.Map(mapContainer, mapOptions);

              const addressMarker = new window.kakao.maps.Marker({
                map: map,
                position: addressCoords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${address}</div>`,
              });
              infowindow.open(map, addressMarker);

              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const currentCoords = new window.kakao.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                  );

                  const imageSrc =
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
                  const imageSize = new window.kakao.maps.Size(32, 35);
                  const imageOption = {
                    offset: new window.kakao.maps.Point(16, 35),
                  };

                  const markerImage = new window.kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imageOption
                  );

                  const currentMarker = new window.kakao.maps.Marker({
                    map: map,
                    position: currentCoords,
                    image: markerImage,
                  });

                  const currentInfowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="padding:5px;">내 위치</div>',
                  });
                  currentInfowindow.open(map, currentMarker);

                  const places = new window.kakao.maps.services.Places();

                  const callback = (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                      const bounds = new window.kakao.maps.LatLngBounds();

                      for (let i = 0; i < data.length; i++) {
                        const position = new window.kakao.maps.LatLng(
                          data[i].y,
                          data[i].x
                        );

                        const marker = new window.kakao.maps.Marker({
                          map: map,
                          position: position,
                        });

                        const infowindow = new window.kakao.maps.InfoWindow({
                          content: `<div style="padding:5px;">${data[i].place_name}</div>`,
                        });
                        infowindow.open(map, marker);
                        bounds.extend(position);
                      }

                      map.setBounds(bounds);
                    }
                  };

                  places.keywordSearch("편의점", callback, {
                    location: currentCoords,
                    radius: 1000,
                  });
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

  return <div id="map" className="map-api"></div>;
};

export default KakaoMap;
