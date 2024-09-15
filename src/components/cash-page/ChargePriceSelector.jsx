import React from "react";
import "./ChargePriceSelector.css";

const ChargePriceSelector = ({
  chargePrice,
  activeIndex,
  clickPriceHandle,
}) => {
  return (
    <div className="charge-price-wrap">
      {chargePrice.map((price, index) => (
        <div
          className={`charge-price-btn ${
            activeIndex === index ? "charge-price-active" : ""
          }`}
          key={price.key}
          onClick={() => clickPriceHandle(index)}
          value={price.price}
        >
          {price.priceBtn}
        </div>
      ))}
    </div>
  );
};

export default ChargePriceSelector;
