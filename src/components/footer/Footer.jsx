import React from "react";
import "../footer/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact">
        <div className="contact-title">고객센터</div>
        <div className="contact-time">
          평일 10:00~18:00 <br />
          점심시간 13:00~14:00 <br />
          *주말, 공휴일 휴무
        </div>
      </div>
      <div className="policy">업체 사업자 정보</div>
      <div className="policy">서비스 이용약관</div>
      <div className="policy">개인정보 처리 방침</div>
      <div className="policy">캠핑장 제휴 신청</div>
      <div className="policy">광고 제휴 문의</div>
    </div>
  );
};

export default Footer;
