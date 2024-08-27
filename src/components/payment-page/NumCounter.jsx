import React, { useState, useEffect } from "react";
import "./NumCounter.css";

const NumCounter = ({ onCountChange, maxCount }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (onCountChange) {
      onCountChange(count);
    }
  }, [count, onCountChange]);

  return (
    <div className="counter-box">
      <button className="counter-button" onClick={decrement}>
        -
      </button>
      <span className="counter-number">{count} 명</span>
      <button
        className="counter-button"
        onClick={increment}
        disabled={count >= maxCount}
      >
        +
      </button>
    </div>
  );
};

export default NumCounter;
