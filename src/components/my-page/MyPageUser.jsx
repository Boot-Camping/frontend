import React, { useEffect, useState } from "react";
import "./MyPageUser.css";
import { mypageImgs, myPageData } from "../../constants/mypage";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { get } from "../../utils/Api";
import MyPageLogout from "./MyPageLogout";

const MyPageUser = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await get(`userprofile/${userId}`, customHeaders);
        if (response.length > 0) {
          setName(response[0].name);
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.log(errorMessage);
      }
    };

    getUserData();
  }, [accessToken, userId]);

  return (
    <div className="mypage-user-wrap">
      <div className="mypage-user">
        <ReactSVG src={mypageImgs.user} className="mypage-user-icon" />
        <div className="mypage-user-info">
          <div>{name}</div>
          <Link to="/userinfo" className="user-setting">
            <div>내 정보 관리</div>
            <ReactSVG
              src={mypageImgs.setting}
              className="mypage-setting-icon"
            />
          </Link>
        </div>
      </div>
      <MyPageLogout />
    </div>
  );
};

export default MyPageUser;
