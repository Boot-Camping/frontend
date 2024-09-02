import React, { useState } from "react";
import "./MyPageLogout.css";
import { closeModal } from "../../utils/closeModal";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api";
import PortalModal from "../common/PortalModal";
import EmptyContent from "../common/EmptyContent";

const MyPageLogout = ({ errorMessage, setErrorMessage }) => {
  const { accessToken } = getUserIdFromToken();
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const logoutModalHandle = (event) => {
    event.preventDefault();

    setIsOpened(true);
  };

  const logoutHandle = async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      await post("user/logout", {}, customHeaders);
      setIsOpened(false);

      localStorage.removeItem("accessToken");
      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <button className="logout-btn" onClick={logoutModalHandle}>
        로그아웃
      </button>

      <>
        {isOpened && (
          <PortalModal setIsOpened={setIsOpened}>
            <div className="logout-modal modal">
              <div className="logout-txt">
                <div>로그아웃 하시겠습니까?</div>
                <div className="logout-btn-wrap">
                  <button
                    className="logout-cancel-btn"
                    onClick={closeModal(setIsOpened)}
                  >
                    취소
                  </button>
                  <button className="logout-confirm-btn" onClick={logoutHandle}>
                    확인
                  </button>
                </div>

                {error && (
                  <EmptyContent errorMessage={errorMessage} error={error} />
                )}
              </div>
            </div>
          </PortalModal>
        )}
      </>
    </>
  );
};

export default MyPageLogout;
