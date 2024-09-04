import React from "react";
import "../footer/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-upper">
          <div className="contact">
            <div className="contact-title">고객센터</div>
            <div className="contact-time">
              평일 10:00~18:00 <br />
              *주말, 공휴일 휴무 <br />
            </div>
          </div>
          <div className="policy">업체 사업자 정보</div>
          <div className="policy">서비스 이용약관</div>
          <div className="policy">개인정보 처리 방침</div>
          <div className="policy">캠핑장 제휴 신청</div>
        </div>
        <div className="footer-copy-writer">
          본 사이트에서 사용된 이미지는 캠핑톡의 저작권 보호를 받으며, 모든
          권리는 해당 저작권자에게 있습니다.
          <br /> 무단 복제 및 배포를 금합니다.
        </div>
      </div>
    </>
  );
};

export default Footer;
