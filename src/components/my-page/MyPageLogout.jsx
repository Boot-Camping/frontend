import React, { useState } from "react";
import "./MyPageLogout.css";
import { closeModal } from "../../utils/closeModal";
import { useNavigate } from "react-router-dom";
import PortalModal from "../common/PortalModal";
import EmptyContent from "../common/EmptyContent";
import useLogout from "../../hooks/useLogout";
import { resetModal } from "../../utils/resetModal";

const MyPageLogout = ({ errorMessage, setErrorMessage }) => {
  const { postLogout } = useLogout();
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const openLogoutModalHandle = (event) => {
    event.preventDefault();
    setIsOpened(true);
  };

  const closeLogoutModalHandle = () => {
    resetModal(setIsOpened, setError, setErrorMessage);
  };

  const logoutHandle = async () => {
    const isSuccess = await postLogout(setErrorMessage, setError);
    if (isSuccess) {
      setIsOpened(false);
      localStorage.removeItem("accessToken");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <>
      <button className="logout-btn" onClick={openLogoutModalHandle}>
        로그아웃
      </button>

      <>
        {isOpened && (
          <PortalModal
            setIsOpened={setIsOpened}
            setError={setError}
            setErrorMessage={setErrorMessage}
          >
            <div className="logout-modal modal">
              <div className="logout-txt">
                <div>로그아웃 하시겠습니까?</div>
                <div className="logout-btn-wrap">
                  <button
                    className="logout-cancel-btn"
                    onClick={closeLogoutModalHandle}
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
