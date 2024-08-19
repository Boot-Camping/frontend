import React from "react";
import "../components/my-page/MyPage.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { mypageBtns, mypageImgs } from "../constants/mypage";
import MyPageUser from "../components/my-page/MyPageUser";

const MyPage = () => {
  return (
    <section className="mypage-wrap">
      <MyPageUser />

      <div className="mypage-btn-wrap">
        {mypageBtns.map((mypageBtn) => (
          <Link
            to={mypageBtn.link}
            className={`mypage-btn ${mypageBtn.key}`}
            key={mypageBtn.key}
          >
            <ReactSVG
              src={mypageImgs[mypageBtn.src]}
              className="mypage-btn-icon"
            />
            <div>{mypageBtn.txt}</div>
          </Link>
        ))}
      </div>

      <Link to="/notice" className="mypage-btn-notice">
        <div className="mypage-notice-text">
          <div>공지사항 및 이벤트</div>
          <div>공지사항과 진행중인 이벤트를 확인하세요</div>
        </div>
        <ReactSVG src={mypageImgs.next} className="mypage-notice-icon" />
      </Link>
    </section>
  );
};

export default MyPage;
