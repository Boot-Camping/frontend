import React, { useEffect } from "react";
import "../components/my-page/MyPage.css";
import { useNavigate } from "react-router-dom";
import MyPageUser from "../components/my-page/MyPageUser";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import MyPageLink from "../components/my-page/MyPageLink";

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
      <MyPageLink />
    </section>
  );
};

export default MyPage;
