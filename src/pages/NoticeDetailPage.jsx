import React, { useEffect, useState } from "react";
import "../components/notice-detail-page/NoticeDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import { shortDateDot } from "../utils/shortDateDot";
import { get } from "../utils/api";
import EmptyContent from "../components/common/EmptyContent";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getNoticeDetailData = async () => {
      try {
        const response = await get(`admin/notice/${id}`);
        setNotice(response);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getNoticeDetailData();
  }, [id]);

  return (
    <div className="notice-detail">
      <>
        {notice ? (
          <>
            <div className="notice-detail-info-wrap">
              <div className="move-prev">
                <ReactSVG
                  src={svgCollection.prev}
                  className="notice-move-prev"
                  onClick={() => navigate(-1)}
                />
                <div>목록</div>
              </div>
              <div className="notice-detail-info">
                <div className="notice-detail-title">{notice.title}</div>
              </div>
              <div className="notice-detail-date underline">
                {shortDateDot(notice)}
              </div>
            </div>
            <div className="notice-detail-desc">{notice.description}</div>
            <div className="notice-detail-img">
              {notice.imageUrl && Array.isArray(notice.imageUrl) ? (
                notice.imageUrl.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Notice image ${index + 1}`}
                  />
                ))
              ) : (
                <p>이미지가 없습니다.</p>
              )}
            </div>
          </>
        ) : (
          <EmptyContent errorMessage={errorMessage} />
        )}
      </>
    </div>
  );
};

export default NoticeDetailPage;
