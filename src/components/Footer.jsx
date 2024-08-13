import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-section">
          <div className="policy">서비스 이용약관</div>
          <div className="policy">개인정보 처리 방침</div>
          <div className="policy">캠핑장 제휴 신청</div>
          <div className="policy">광고 제휴 문의</div>
        </div>

        <div className="footer-section">
          <div className="call-center">
            <div className="call-center-title">고객센터</div>
            <div className="call-center-time">
              <div>평일 10:00~18:00</div>
              <div>점심시간 13:00~14:00</div>
              <div>*주말, 공휴일 휴무</div>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <div className="questions">자주 묻는 질문</div>
        </div>
        <div className="company-info">업체 사업자 정보</div>
      </div>
    </>
  );
};

export default Footer;
