import React from "react";
import "./EmptyContent.css";

const EmptyContent = ({ errorMessage, error }) => {
  const responseMessage = errorMessage.includes("Message: ")
    ? errorMessage.split("Message: ")[1]
    : "내역이 존재하지 않습니다";

  return (
    <div className={`${!error ? "empty-content" : "error-message"}`}>
      <div>{responseMessage}</div>
    </div>
  );
};

export default EmptyContent;
