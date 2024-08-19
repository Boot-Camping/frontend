import React, { useRef, useState } from "react";
import "../components/delete-account-page/DeleteAccountPage.css";
import DeleteAccountInfo from "../components/delete-account-page/DeleteAccountInfo";
import DeleteConfirm from "../components/delete-account-page/DeleteConfirm";
import DeleteAccountModal from "../components/delete-account-page/DeleteAccountModal";

const DeleteAccountPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState(false);

  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);

  const deleteHandle = (event) => {
    event.preventDefault();

    const password = passwordRef.current.value;
    const isChecked = checkboxRef.current.checked;

    if (!password) {
      passwordRef.current.focus();
      return;
    }

    if (!isChecked) {
      setIsOpened(true);
      setError(true);
      return;
    }

    console.log("탈퇴 완료", { password });
    setIsOpened(true);
    setError(false);
  };

  return (
    <section className="delete-account-wrap">
      <DeleteAccountInfo />
      <DeleteConfirm passwordRef={passwordRef} checkboxRef={checkboxRef} />

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
