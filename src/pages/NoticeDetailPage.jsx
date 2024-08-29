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
  const [notice, setNotice] = useState("");
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
  }, []);

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
                {/* <div className="notice-detail-status">
                  {notice.noticeStatus}
                </div> */}
                <div className="notice-detail-title">{notice.title}</div>
              </div>
              <div className="notice-detail-date underline">
                {shortDateDot(notice)}
              </div>
            </div>
            <div className="notice-detail-desc">{notice.description}</div>
            <div className="notice-detail-img">
              <img src={notice.imageUrl[0]} />
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
