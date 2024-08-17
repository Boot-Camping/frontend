import React, { useState } from "react";

const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedText = isExpanded
    ? text
    : `${text.substring(0, maxLength)}...`;

  return (
    <div className="readmore">
      <p className="readmore-text">{displayedText}</p>
      <button className="readmore-button" onClick={toggleReadMore}>
        {isExpanded ? "접기" : "더보기 "}
      </button>
    </div>
  );
};

export default ReadMore;
