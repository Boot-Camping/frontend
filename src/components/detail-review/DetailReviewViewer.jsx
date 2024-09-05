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

const svg = svgCollection;

Modal.setAppElement("#root");

const DetailReviewViewer = ({ campId }) => {
  const [visibleReviews, setvisibleReviews] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { campReviews, loading, error } = useCampReview(campId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const loadMore = () => {
    if (isExpanded) {
      setvisibleReviews(1);
    } else {
      setvisibleReviews(campReviews.length);
    }
    setIsExpanded(!isExpanded);
  };

  const toggleReply = (index) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [index]: !prevVisibleReplies[index],
    }));
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

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
                {review.reviewImages && review.reviewImages.length > 0 ? (
                  review.reviewImages
                    .slice(0, 4)
                    .map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        className="detail-review-img"
                        src={image}
                        onClick={() => openModal(image)}
                        alt={`리뷰 이미지 ${imageIndex + 1}`}
                      />
                    ))
                ) : (
                  <div className="detail-no-review-img">
                    리뷰 사진이 없습니다
                  </div>
                )}
              </div>
              <div className="review-upper-tag">
                {review.reviewTags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="review-tag">
                    {reviewTag.find((t) => t.label === tag)?.value || tag}
                  </div>
                ))}
              </div>
              <div className="review-grade">
                <StarGrade grade={review.grade} />
              </div>
            </div>
          </div>

          <div className="review-reply-box">
            <ReactSVG src={svg.letter} className="review-letter-icon" />
            <div
              className="review-reply-count"
              onClick={() => toggleReply(index)}
            >
              댓글읽기
            </div>
          </div>
          {visibleReplies[index] && <ReplyViewer reviewId={review.id} />}
        </div>
      ))}
      <ReviewMoreBtn onClick={loadMore} isExpanded={isExpanded} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
