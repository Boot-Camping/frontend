import React, { useEffect, useState } from "react";
import "./PaymentPage.css";
import { policies } from "../../constants/policies";

const PaymentPolicy = ({ allCheckedHandle }) => {
  const [checkedPolicy, setCheckedPolicy] = useState(
    new Array(policies.length).fill(false)
  );

  const checkboxChangeHandle = (index) => {
    let updatedCheckedPolicy;
    if (index === 0) {
      // 첫 번째 체크박스를 클릭하면, 모든 체크박스를 동일하게 설정
      const isChecked = !checkedPolicy[0];
      updatedCheckedPolicy = new Array(policies.length).fill(isChecked);
    } else {
      // 나머지 체크박스 클릭 시 개별적으로 업데이트
      updatedCheckedPolicy = checkedPolicy.map((item, i) =>
        i === index ? !item : item
      );
    }
    setCheckedPolicy(updatedCheckedPolicy);
  };

  useEffect(() => {
    const allChecked = checkedPolicy.every((isChecked) => isChecked);
    allCheckedHandle(allChecked);
  }, [checkedPolicy, allCheckedHandle]);

  return (
    <div className="payment-policy">
      <h2 className="policy-title">약관동의</h2>
      <div>
        {policies.map((policy, index) => (
          <div key={policy.id} className={policy.id}>
            <input
              type="checkbox"
              className="checkbox"
              checked={checkedPolicy[index]}
              onChange={() => checkboxChangeHandle(index)}
            />
            {policy.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPolicy;
