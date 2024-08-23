import React, { useEffect, useState } from "react";
import "./MyPageUser.css";
import { mypageImgs, myPageData } from "../../constants/mypage";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { get } from "../../utils/Api";

const MyPageUser = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await get(`userprofile/${userId}`, customHeaders);
        console.log(response);
        if (response.length > 0) {
          setName(response[0].name);
        }
      } catch (error) {
        let status = "알 수 없는 오류";
        let message = error.message;

        if (error.response) {
          status = error.response.status;
          message = error.response.data.message || "오류가 발생했습니다";
          console.log();
        } else if (error.request) {
          message = "서버로부터 응답을 받지 못했습니다";
        }
        console.log(`상태 코드: ${status}, 에러 메시지: ${message}`);
      }
    };

    getUserData();
  }, [accessToken, userId]);

  return (
    <div className="mypage-user">
      <div className="mypage-user-info">
        <ReactSVG src={mypageImgs.user} className="mypage-user-icon" />
        <div>{name}</div>
      </div>
      <Link to="/userinfo" className="user-setting">
        <div>내 정보 관리</div>
        <ReactSVG src={mypageImgs.setting} className="mypage-setting-icon" />
      </Link>
    </div>
  );
};

export default MyPageUser;
