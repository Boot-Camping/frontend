import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";

import { reviewTag } from "../../constants/reviewTag";
import ReviewImgUploader from "../detail-review/ReviewImgUploader";
import StarRating from "../detail-review/StarRating";
import NormalModal from "../common/NormalModal";
import { useMyReviewWriter } from "../../hooks/useMyReviewWriter";
import { maxNumImageUpload } from "../../constants/maxNumImageUpload";

const svg = svgCollection;
const maxNum = maxNumImageUpload;

const ReviewWriter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reviewData = location.state?.reviewData;
  const campId = reviewData.campId;

  const {
    reviewGrade,
    reviewContent,
    reviewImages,
    selectedTags,
    error,
    isModalOpen,
    gradeChangeHandle,
    setReviewContent,
    setReviewImages,
    toggleTagHandle,
    reviewSubmit,
    openModal,
    closeModal,
  } = useMyReviewWriter(campId, navigate);

  return (
    <div>
      <div className="review-writer-title">리뷰 작성</div>
      <div className="review-question-box">
        <div className="review-question">
          해당 캠핑장에 대해 얼마나 만족하셨나요?
        </div>

        <StarRating totalStars={5} gradeChangeHandle={gradeChangeHandle} />
      </div>

      <div className="review-question-box">
        <div className="review-question">
          해당 캠핑장에 대해 리뷰를 남겨주세요.
        </div>

        <div className="tag-group">
          {reviewTag.map((tag) => (
            <div key={tag.id} className="tag-checkbox-wrapper">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                className="tag-checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTagHandle(tag)}
              />
              <label
                htmlFor={`tag-${tag.id}`}
                className={`tag-label ${tag.className} ${
                  selectedTags.includes(tag.id) ? "selected" : ""
                }`}
              >
                {tag.value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <textarea
        type="text"
        className="review-writer-content"
        placeholder="캠핑장에 대한 의견을 남겨주세요!"
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />

      <div className="img-input-box">
        <div className="img-input-title">
          이미지를 등록해주세요 (최대 {maxNum.imgNum}장)
        </div>
        <ReviewImgUploader
          maxImages={maxNum.imgNum}
          setReviewImages={setReviewImages}
        />
      </div>

      <button
        className="review-regi-btn"
        onClick={() => {
          reviewSubmit();
          openModal();
        }}
      >
        리뷰 등록
      </button>

      <NormalModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <p className="payment-modal-title">리뷰가 작성되었습니다!</p>
        <div className="modal-box">
          <Link to="/" className="payment-modal-button">
            홈으로 이동
          </Link>
          <Link to="/mypage/myreview" className="payment-modal-button">
            나의 리뷰 보러가기
          </Link>
        </div>
      </NormalModal>
    </div>
  );
};

export default ReviewWriter;
