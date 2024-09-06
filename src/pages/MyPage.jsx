import React, { useEffect } from "react";
import "../components/my-page/MyPage.css";
import { useNavigate } from "react-router-dom";
import MyPageUser from "../components/my-page/MyPageUser";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import MyPageLinkBtn from "../components/my-page/MypageLinkBtn";

const MyPage = () => {
  const { accessToken } = getUserIdFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  return (
    <section className="mypage-wrap">
      <MyPageUser />
      <MyPageLinkBtn />
    </section>
  );
};

export default MyPage;
