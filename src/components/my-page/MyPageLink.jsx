import React from "react";
import "./MyPageLink.css";
import MyPageBtn from "./MyPageBtn";
import { mypageBtns } from "../../constants/mypage";
import NoticeLink from "./NoticeLink";

const MyPageLinkBtn = () => {
  return (
    <div className="mypage-link-wrap">
      <div className="mypage-btn-wrap">
        {mypageBtns.map((mypageBtn) => (
          <MyPageBtn key={mypageBtn.key} btn={mypageBtn} />
        ))}
      </div>

      <NoticeLink />
    </div>
  );
};

export default MyPageLinkBtn;
