import React, { useEffect, useState } from "react";
import "../components/user-info-page/UserInfoPage.css";
import UserProfile from "../components/user-info-page/UserProfile";
import UserAccount from "../components/user-info-page/UserAccount";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import UserInfoModal from "../components/user-info-page/UserInfoModal";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";
import { svgCollection } from "../constants/svgCollection";
import UserImage from "../components/user-info-page/UserImage";
import EmptyContent from "../components/common/EmptyContent";

const UserInfoPage = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [userDataArray, setUserDataArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [modalType, setModalType] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    try {
      const response = await get(`userprofile/${userId}`, customHeaders);
      setUserDataArray(response);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [accessToken, userId]);

  const userData = userDataArray.length > 0 ? userDataArray[0] : null;

  return (
    <section className="user-info-wrap">
      <div className="user-info-aside">
        <div className="user-info-title">
          <Link to={"/mypage"}>
            <ReactSVG src={svgCollection.prev} className="user-info-prev" />
          </Link>
          <div>내 정보 관리</div>
        </div>
        {userData && (
          <UserImage
            userData={userData}
            error={error}
            setError={setError}
						errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            onUpdate={getUserData}
          />
        )}
      </div>
      {loading ? (
        <div>로딩중</div>
      ) : userData ? (
        <>
          <div className="user-info-content">
            <UserProfile
              setIsOpened={setIsOpened}
              setModalType={setModalType}
              userData={userData}
            />
            <UserAccount
              setIsOpened={setIsOpened}
              setModalType={setModalType}
              userData={userData}
            />
            <Link to={"/cash"} className="user-cash-wrap">
              <div>캐시</div>
              <div>
                <div>{userData.balance.toLocaleString()}원</div>
                <ReactSVG src={svgCollection.prev} className="user-arrow-img" />
              </div>
            </Link>
          </div>

          <UserInfoModal
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            modalType={modalType}
            tel={userData.tel}
            addr={userData.addr}
            setError={setError}
            onUpdate={getUserData}
          />
        </>
      ) : (
        <EmptyContent errorMessage={errorMessage} error={error} />
      )}
    </section>
  );
};

export default UserInfoPage;
