import React from "react";
import "../css/MainPage.css";

const MainPage = () => {
  return (
    <>
      <div>
        <div className="slider-title">새로 등록된 캠핑장소</div>
        <img
          className="slider-img"
          src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/6_1_974d4b410d.png"
          alt=""
        />
      </div>

      <ul className="catgory">
        <li>
          <img
            className="catgory-img"
            src="https://cdn-icons-png.flaticon.com/512/5110/5110754.png"
            alt=""
          />
          <div className="catgory-title">전체</div>
        </li>
        <li>
          <img
            className="catgory-img"
            src="data:image/png;base64,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"
            alt=""
          />
          <div className="catgory-title">숲속</div>
        </li>
        <li>
          <img
            className="catgory-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS95s2wPiZnhvu_E5-n9F-XNGK-9_lUE3Yyqg&s"
            alt=""
          />
          <div className="catgory-title">바다</div>
        </li>
        <li>
          <img
            className="catgory-img"
            src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-the-valley-png-image_4199188.jpg"
            alt=""
          />
          <div className="catgory-title">계곡</div>
        </li>
        <li>
          <img
            className="catgory-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/thumbnail__633c2f9041.png"
            alt=""
          />
          <div className="catgory-title">반려견</div>
        </li>
        <li>
          <img
            className="catgory-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/thumbnail__e908f60264.png"
            alt=""
          />
          <div className="catgory-title">노키즈</div>
        </li>
      </ul>

      <div className="review-title">실시간 리뷰</div>
      <div>
        <div className="review-box">
          <img
            className="review-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_IMG_0197_dac74dac65.jpeg"
            alt=""
          />
          <div>
            <div className="review-text">
              강아지와 함께 계곡물에서 놀면서 맛있는것도 먹고 놀아서 즐겁네요
              요즘은 반려견동반이 가능 한 곳으로 오니 우리 똘이와 함께
              뛰어놀면서 힐링했어요 아 너무너무너무 좋아요 감사합니다
            </div>
            <div className="review-time">18분전</div>
            <div className="review-place">미산 분교 캠핑장</div>
          </div>
        </div>
        <div className="review-box">
          <img
            className="review-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_IMG_0197_dac74dac65.jpeg"
            alt=""
          />
          <div>
            <div className="review-text">
              강아지와 함께 계곡물에서 놀면서 맛있는것도 먹고 놀아서 즐겁네요
              요즘은 반려견동반이 가능 한 곳으로 오니 우리 똘이와 함께
              뛰어놀면서 힐링했어요 아 너무너무너무 좋아요 감사합니다
            </div>
            <div className="review-time">18분전</div>
            <div className="review-place">미산 분교 캠핑장</div>
          </div>
        </div>
        <div className="review-box">
          <img
            className="review-img"
            src="https://campingagains3.s3.ap-northeast-2.amazonaws.com/small_IMG_0197_dac74dac65.jpeg"
            alt=""
          />
          <div>
            <div className="review-text">
              강아지와 함께 계곡물에서 놀면서 맛있는것도 먹고 놀아서 즐겁네요
              요즘은 반려견동반이 가능 한 곳으로 오니 우리 똘이와 함께
              뛰어놀면서 힐링했어요 아 너무너무너무 좋아요 감사합니다
            </div>
            <div className="review-time">18분전</div>
            <div className="review-place">미산 분교 캠핑장</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
