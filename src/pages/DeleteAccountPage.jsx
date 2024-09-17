import React, { useRef, useState } from "react";
import "../components/delete-account-page/DeleteAccountPage.css";
import DeleteAccountInfo from "../components/delete-account-page/DeleteAccountInfo";
import DeleteConfirm from "../components/delete-account-page/DeleteConfirm";
import DeleteAccountModal from "../components/delete-account-page/DeleteAccountModal";
import EmptyContent from "../components/common/EmptyContent";
import useDeleteAccount from "../hooks/useDeleteAccount";

const DeleteAccountPage = () => {
  const { deleteAccount, errorMessage, error, setError } = useDeleteAccount();
  const [isOpened, setIsOpened] = useState(false);
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);

  const focusOnEmptyField = (fieldRef) => {
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  };

  const validateFields = () => {
    const loginId = idRef.current.value;
    const password = passwordRef.current.value;
    const isChecked = checkboxRef.current.checked;

    if (!loginId) {
      focusOnEmptyField(idRef);
      return false;
    }

    if (!password) {
      focusOnEmptyField(passwordRef);
      return false;
    }

    if (!isChecked) {
      setIsOpened(true);
      setError(true);
      return false;
    }

    return true;
  };

  const deleteClickHandle = async (event) => {
    event.preventDefault();

    if (validateFields()) {
      const loginId = idRef.current.value;
      const password = passwordRef.current.value;

      const isDeleted = await deleteAccount(loginId, password);
      if (isDeleted) {
        setIsOpened(true);
        localStorage.removeItem("accessToken");
      } else {
        setIsOpened(false);
      }
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

      <button className="delete-account-btn" onClick={deleteClickHandle}>
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
