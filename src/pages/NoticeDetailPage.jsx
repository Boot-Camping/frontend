import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmptyContent from "../components/common/EmptyContent";
import useNoticeDetail from "../hooks/useNoticeDetail";
import NoticeDetailContent from "../components/notice-detail-page/NoticeDetailContent";
import NoticeDetailImages from "../components/notice-detail-page/NoticeDetailImages";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const { notice, errorMessage } = useNoticeDetail(id);
  const navigate = useNavigate();

  const navigateBackHandle = () => {
    navigate(-1);
  };

  return (
    <div className="notice-detail">
      <>
        {notice ? (
          <>
            <NoticeDetailContent
              notice={notice}
              navigateBackHandle={navigateBackHandle}
            />
            <NoticeDetailImages imageUrl={notice.imageUrl} />
          </>
        ) : (
          <EmptyContent errorMessage={errorMessage} />
        )}
      </>
    </div>
  );
};

export default NoticeDetailPage;
