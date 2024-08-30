import React from "react";
import { useParams } from "react-router-dom";
import DetailPageInfo from "../components/detail-page/DetailPageInfo";
import DetailReviewViewer from "../components/review-reply-page/DetailReviewViewer";
import BookButton from "../components/detail-page/BookButton";
import ImageSlider from "../components/detail-page/ImageSlider";
import KakaoMap from "../components/detail-page/KakaoMap";
import useCampInfo from "../hooks/useCampInfo";

import "../components/detail-page/DetailPage.css";

const DetailPage = () => {
  const { campId } = useParams();
  const { detailInfo, loading, error } = useCampInfo(campId, "detailInfo");

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>캠핑장 정보 가져오기 실패: {error.message}</div>;
  }

  return (
    <div>
      <ImageSlider detailImages={detailInfo.imageUrls} />
      <DetailPageInfo detailInfo={detailInfo} />
      <div className="map-title">근처 편의점 찾기</div>
      <KakaoMap address={detailInfo.addr} />
      <DetailReviewViewer campId={campId} />
      <BookButton to={`/camping/book/${campId}`} />
    </div>
  );
};

export default DetailPage;
