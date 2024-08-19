import React, { useState } from "react";
import "./NumCounter.css";

const NumCounter = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter-box">
      <button className="counter-button" onClick={decrement}>
        -
      </button>
      <span className="counter-number">{count}명</span>
      <button className="counter-button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default NumCounter;
