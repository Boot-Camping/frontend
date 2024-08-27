import React from "react";

const EmptyContent = ({ errorMessage }) => {
  const responseMessage = errorMessage.includes("Message: ")
    ? errorMessage.split("Message: ")[1]
    : "내역이 존재하지 않습니다";

  return (
    <div className="empty-content">
      <div>{responseMessage}</div>
    </div>
  );
};

export default EmptyContent;
