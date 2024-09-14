import React from "react";
import "./NoticeDetailImages.css";

const NoticeDetailImages = ({ imageUrl }) => {
  if (!imageUrl && !Array.isArray(imageUrl)) {
    return <p>이미지가 없습니다.</p>;
  }

  return (
    <div className="notice-detail-img">
      {imageUrl.map((url, index) => (
        <img
          key={`notice-detail-img${index + 1}`}
          src={url}
          alt={`Notice image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default NoticeDetailImages;
