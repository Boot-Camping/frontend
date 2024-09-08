import React, { useState } from "react";
import "./DetailReviewPage.css";
import ReviewMoreBtn from "./ReviewMoreBtn";
import ReplyViewer from "./ReplyViewer";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { formatDate } from "../../utils/formatDate";
import StarGrade from "./StarGrade";
import useCampReview from "../../hooks/useCampReview";
import Modal from "react-modal";
import { reviewTag } from "../../constants/reviewTag";

Modal.setAppElement("#root");

const DetailReviewViewer = ({ campId }) => {
  const [visibleReviews, setVisibleReviews] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { campReviews, loading, error } = useCampReview(campId);

  const loadMoreHandle = () => {
    setVisibleReviews(isExpanded ? 1 : campReviews.length);
    setIsExpanded(!isExpanded);
  };

  const replyToggleHandle = (index) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const modalOpenHandle = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const modalCloseHandle = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const renderReviewTags = (tags) =>
    tags.map((tag, index) => (
      <div key={index} className="review-tag">
        {reviewTag.find((t) => t.label === tag)?.value || tag}
      </div>
    ));

  const renderReviewImages = (images) => {
    if (!images || images.length === 0) {
      return <div className="detail-no-review-img">리뷰 사진이 없습니다</div>;
    }
    return images
      .slice(0, 4)
      .map((image, index) => (
        <img
          key={index}
          className="detail-review-img"
          src={image}
          onClick={() => modalOpenHandle(image)}
          alt={`리뷰 이미지 ${index + 1}`}
        />
      ));
  };

  const renderLoadingOrError = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error.message}</div>;
    }
  };

  if (loading || error) {
    return renderLoadingOrError();
  }

  return (
    <div className="detail-review">
      <div className="review-title">리뷰 {campReviews.length}개 </div>
      {campReviews.slice(0, visibleReviews).map((review, index) => (
        <div key={index} className="review-box">
          <div className="review-upper-box">
            <div className="review-upper-left">
              <div className="review-upper-writer">
                <div className="review-date">
                  {formatDate(review.createdAt)}
                </div>
                <div className="review-id">{review.loginId}</div>
              </div>
              <div className="review-content">{review.reviewContent}</div>
            </div>

            <div className="review-upper-right">
              <div className="image-grid">
                {renderReviewImages(review.reviewImages)}
              </div>
              <div className="review-upper-tag">
                {renderReviewTags(review.reviewTags)}
              </div>
              <div className="review-grade">
                <StarGrade grade={review.grade} />
              </div>
            </div>
          </div>

          <div className="review-reply-box">
            <ReactSVG
              src={svgCollection.letter}
              className="review-letter-icon"
            />
            <div
              className="review-reply-count"
              onClick={() => replyToggleHandle(index)}
            >
              댓글읽기
            </div>
          </div>
          {visibleReplies[index] && <ReplyViewer reviewId={review.id} />}
        </div>
      ))}
      <ReviewMoreBtn onClick={loadMoreHandle} isExpanded={isExpanded} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalCloseHandle}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedImage && (
          <img src={selectedImage} alt="확대 이미지" className="modal-image" />
        )}
      </Modal>
    </div>
  );
};

export default DetailReviewViewer;
