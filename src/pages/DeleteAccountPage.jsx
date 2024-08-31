import React, { useRef, useState } from "react";
import "../components/delete-account-page/DeleteAccountPage.css";
import DeleteAccountInfo from "../components/delete-account-page/DeleteAccountInfo";
import DeleteConfirm from "../components/delete-account-page/DeleteConfirm";
import DeleteAccountModal from "../components/delete-account-page/DeleteAccountModal";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { deleteRequest } from "../utils/api";
import EmptyContent from "../components/common/EmptyContent";

const DeleteAccountPage = () => {
  const { accessToken } = getUserIdFromToken();
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);

  const deleteHandle = async (event) => {
    event.preventDefault();

    const customHeaders = {
      Authorization: accessToken,
    };

    const loginId = idRef.current.value;
    const password = passwordRef.current.value;
    const isChecked = checkboxRef.current.checked;

    if (!loginId) {
      idRef.current.focus();
      return;
    }

    if (!password) {
      passwordRef.current.focus();
      return;
    }

    if (!isChecked) {
      setIsOpened(true);
      setError(true);
      return;
    }

    const account = {
      loginId: loginId,
      password: password,
    };

    try {
      await deleteRequest("user/delete", account, customHeaders);
      setError(false);
      setErrorMessage("");
      setIsOpened(true);
      localStorage.removeItem("accessToken");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setIsOpened(false);
    }
  };

  return (
    <section className="delete-account-wrap">
      <DeleteAccountInfo />
      <DeleteConfirm
        idRef={idRef}
        passwordRef={passwordRef}
        checkboxRef={checkboxRef}
      />

      {errorMessage && (
        <EmptyContent errorMessage={errorMessage} error={error} />
      )}

      <button className="delete-account-btn" onClick={deleteHandle}>
        회원 탈퇴
      </button>

      <DeleteAccountModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        error={error}
      />
    </section>
  );
};

export default DeleteAccountPage;
