import React from "react";
import "../components/delete-account-page/DeleteAccountPage.css";
import DeleteAccountInfo from "../components/delete-account-page/DeleteAccountInfo";
import DeleteConfirm from "../components/delete-account-page/DeleteConfirm";

const DeleteAccountPage = () => {
  return (
    <section className="delete-account-wrap">
      <DeleteAccountInfo />
      <DeleteConfirm />

      <button className="delete-account-btn">회원 탈퇴</button>
    </section>
  );
};

export default DeleteAccountPage;
