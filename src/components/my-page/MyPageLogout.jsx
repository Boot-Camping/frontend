import React, { useState } from "react";
import "./MyPageLogout.css";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { useNavigate } from "react-router-dom";

const MyPageLogout = () => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

  const logoutModalHandle = (event) => {
    event.preventDefault();

    setIsOpened(true);
  };

  const logoutHandle = (event) => {
    event.preventDefault();

    setIsOpened(false);

    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <button className="logout-btn" onClick={logoutModalHandle}>
        로그아웃
      </button>

      <>
        {isOpened && (
          <>
            {createPortal(
              <div className="overlay" onClick={closeModal(setIsOpened)}></div>,
              document.getElementById("overlay-root")
            )}
            {createPortal(
              <div className="logout-modal modal">
                <div className="logout-txt">
                  <div>로그아웃 하시겠습니까?</div>
                  <div className="logout-btn-wrap">
                    <button className="logout-cancel-btn" onClick={closeModal(setIsOpened)}>취소</button>
                    <button className="logout-confirm-btn" onClick={logoutHandle}>확인</button>
                  </div>
                </div>
              </div>,
              document.getElementById("modal-root")
            )}
          </>
        )}
      </>
    </>
  );
};

export default MyPageLogout;
