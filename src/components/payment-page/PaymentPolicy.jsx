import React from "react";
import { ReactSVG } from "react-svg";

import "./PaymentPage.css";
import checkImg from "../../assets/svg/check2.svg";
import { policies } from "../../constants/policies";

const PaymentPolicy = () => {
  return (
    <div className="payment-policy">
      <h2>약관동의</h2>
      <div className="policy-detail">
        {policies.map((policy) => (
          <div key={policy.id} className={policy.id}>
            <ReactSVG className="checkImg" src={checkImg} alt="" />
            {policy.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPolicy;
