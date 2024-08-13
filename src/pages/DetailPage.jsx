import React from "react";
import "../css/DetailPage.css";
import ImageSlider from "../components/ImageSlider";

const DetailPage = () => {
  return (
    <>
      <ImageSlider />
      <div className="detail-content">
        <div class="rating">
          <div>⭐️ 5.0 👀 123</div>
        </div>

        <div className="main-info">
          <h2 className="title">캠프그라운드 화온</h2>
          <div className="price">40,000원/ 1박</div>
        </div>

        <div className="tags">
          <span className="tag">산</span>
          <span className="tag">계곡</span>
          <span className="tag">바다</span>
          <span className="tag">반려견동반가능</span>
          <span className="tag">키즈전문</span>
        </div>

        <div className="info">
          <div className="info-item">
            <img src="./assets/location.svg" />
            충남 아산시 영인면 고룡산로 512-37
          </div>
          <div className="info-item">
            <img src="./assets/phone.svg" alt="" /> 050713733109
          </div>
          <div className="info-item">
            <img src="./assets/group.svg" alt="" />
            기준인원 4명 / 최대인원 6명
          </div>
          <div className="info-item">
            <img src="./assets/calculator.svg" alt="" />
            인당 추가요금 10,000원
          </div>
        </div>

        <div className="description">
          10,000평의 대자연 속에 조성된 편안한 쉼터, 캠프그라운드 화온으로
          여러분을 초대합니다. 세 가지 다른 감성의 캠핑존과 아름다운 자연 속에서
          진정한 자신을 찾는 새로운 여정을 시작하세요. PINE - 울창한 솔숲 솔내음
          속 조용한 힐링 OAK - 하늘을 향해 뻗은 참나무 그늘 아래 즐거운 휴식
          VIEW - 바다 위 붉은 노을과 하늘빛 호수, 그 위로 쏟아지는 별빛 60여개의
          데크와 파쇄석 ·····
        </div>

        <button className="more-info">
          더보기
          <img src="./assets/arrow.svg" alt="" />
        </button>
        <img className="mockMap" src="./assets/mockMap.png" alt="" />
      </div>
    </>
  );
};

export default DetailPage;
