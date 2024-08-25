import React from "react";

const EmptyContent = ({ errorMessage }) => {
  const responseMessage = errorMessage.split("Message: ")[1];

  return (
    <div className="empty-content">
      <div>{responseMessage}</div>
    </div>
  );
};

export default EmptyContent;
