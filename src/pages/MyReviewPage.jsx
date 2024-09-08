import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { svgCollection } from "../constants/svgCollection";
import "../components/my-review-page/MyReviewPage.css";

import useMyReview from "../hooks/useMyReview";
import updateMyReview from "../utils/updateMyReview";
import deleteMyReview from "../utils/deleteMyReview";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { formatDate } from "../utils/formatDate";
import StarGrade from "../components/detail-review/StarGrade";
import { reviewTag } from "../constants/reviewTag";

const MyReviewPage = () => {
  const { userId, accessToken } = getUserIdFromToken();
  const updateReview = updateMyReview;
  const { deleteReview } = deleteMyReview();
  const [visibleReplies, setVisibleReplies] = useState({});
  const [editMode, setEditMode] = useState(null); // 수정 중인 리뷰 ID 저장
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용 저장
  const { myReviews, setMyReviews, fetchMyReviews } = useMyReview(
    userId,
    accessToken
  );

  // 리뷰 업데이트
  const refreshReviews = async () => {
    try {
      await fetchMyReviews();
    } catch (error) {
      console.error("리뷰 갱신 실패:", error);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, [userId, accessToken]);

  // 리뷰 작성 핸들
  const saveClickHandle = async (reviewId) => {
    const content = editedContent;
    const imageUrls =
      myReviews.find((review) => review.id === reviewId)?.reviewImages || [];

    try {
      const updatedReview = await updateReview(
        userId,
        accessToken,
        reviewId,
        content,
        imageUrls
      );
      console.log("업데이트된 리뷰:", updatedReview);

      setMyReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? { ...review, reviewContent: content }
            : review
        )
      );

      // 수정 모드 해제
      setEditMode(null);
    } catch (error) {
      console.error("리뷰 수정에 실패했습니다🥲", error);
    }
  };

  // 리뷰 수정 핸들
  const editClickHandle = (reviewId, currentContent) => {
    setEditMode(reviewId);
    setEditedContent(currentContent);
  };

  // 리뷰 삭제 핸들
  const deleteClickHandle = async (reviewId) => {
    try {
      await deleteReview(userId, accessToken, reviewId);
      setMyReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.log("리뷰 삭제에 실패했습니다🥲", error);
    }
  };

  return (
    <div className="my-review">
      <div className="my-review-title-wrap">
        <Link to={"/mypage"}>
          <ReactSVG src={svgCollection.prev} className="my-review-move-prev" />
        </Link>
        <div>나의 리뷰</div>
      </div>

      {myReviews.map((myReview, index) => (
        <div key={index} className="review-box">
          <div className="my-review-upper">
            <div className="my-review-left-box">
              <div className="my-review-camp-name">{myReview.campName}</div>
              <div className="my-review-date">
                {formatDate(myReview.createdAt)}
              </div>
              <div className="review-edit-box">
                {editMode === myReview.id ? (
                  <input
                    value={editedContent}
                    type="text"
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="review-edit-content"
                  />
                ) : (
                  <div className="my-review-content">
                    {myReview.reviewContent}
                  </div>
                )}
              </div>
            </div>

            <Link to={`/camping/detail/${myReview.campId}`} key={index}>
              <div className="my-review-right-box">
                {myReview.reviewImages && myReview.reviewImages.length > 0 ? (
                  <img
                    className="my-review-img"
                    src={myReview.reviewImages[0]}
                    alt="리뷰 이미지"
                  />
                ) : (
                  <div className="my-no-review-img">리뷰 사진이 없습니다</div>
                )}
                <div className="my-review-tag-wrapper">
                  {myReview.reviewTags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="my-review-tag">
                      {reviewTag.find((t) => t.label === tag)?.value || tag}
                    </div>
                  ))}
                </div>
                <div className="my-review-grade">
                  <StarGrade grade={myReview.grade} />
                </div>
              </div>
            </Link>
          </div>

          <div className="my-review-lower">
            <div className="my-review-edit-btns">
              {editMode === myReview.id ? (
                <>
                  <button
                    className="my-review-save-btn"
                    onClick={() => saveClickHandle(myReview.id)}
                  >
                    저장
                  </button>
                  <button
                    className="my-review-cancel-btn"
                    onClick={() => setEditMode(null)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="my-review-edit-btn"
                    onClick={() =>
                      editClickHandle(myReview.id, myReview.reviewContent)
                    }
                  >
                    수정
                  </button>
                  <button
                    className="my-review-delete-btn"
                    onClick={() => deleteClickHandle(myReview.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReviewPage;
