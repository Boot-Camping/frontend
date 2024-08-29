import React, { useEffect, useState } from "react";
import "./MyPageUser.css";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { get } from "../../utils/api";
import MyPageLogout from "./MyPageLogout";
import { svgCollection } from "../../constants/svgCollection";

const MyPageUser = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };

      try {
        const response = await get(`userprofile/${userId}`, customHeaders);
        if (response.length > 0) {
          setUserImage(response[0].images[0]);
          setUserName(response[0].name);
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
        {userImage === "" ? (
          <ReactSVG src={svgCollection.userImg} className="mypage-user-icon" />
        ) : (
          <div className="mypage-user-icon">
            <img src={userImage} />
          </div>
        )}
        <div className="mypage-user-info">
          <div>{userName}</div>
          <Link to="/userinfo" className="user-setting">
            <div>내 정보 관리</div>
            <ReactSVG
              src={svgCollection.setting}
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
