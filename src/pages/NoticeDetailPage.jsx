import React from "react";
import "../components/notice-detail-page/NoticeDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { noticeDetailData } from "../constants/notice";
import { ReactSVG } from "react-svg";
import { saveIcon } from "../constants/save";
import { shortDateDot } from "../utils/shortDateDot";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const notice = noticeDetailData.find((data) => data.id === parseInt(id));
  const navigate = useNavigate();

  return (
    <div className="notice-detail">
      <>
        {notice ? (
          <>
            <div className="notice-detail-info-wrap">
              <div className="move-prev">
                <ReactSVG
                  src={saveIcon.prev}
                  className="notice-move-prev"
                  onClick={() => navigate(-1)}
                />
                <div>목록</div>
              </div>
              <div className="notice-detail-info">
                <div className="notice-detail-status">
                  {notice.noticeStatus}
                </div>
                <div className="notice-detail-title">{notice.title}</div>
              </div>
              <div className="notice-detail-date underline">
                {shortDateDot(notice)}
              </div>
            </div>
            <div className="notice-detail-desc">{notice.noticeRequest}</div>
            <div className="notice-detail-img">
              <img src={notice.images} />
            </div>
          </>
        ) : (
          "해당 공지사항이 존재하지 않습니다"
        )}
      </>
    </div>
  );
};

export default NoticeDetailPage;
