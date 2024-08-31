import React from "react";
import useAddress from "../../hooks/useAddress";
import PostCodeAddress from "./PostCodeAddress";

const SIGN_UP = [{ key: "1", label: "주소", type: "text", placeholder: "" }];

const AdminCampAddress = ({ addr, setAddr, setError, setIsOpened }) => {
  const { postcode, addr: addressFromHook } = useAddress();

  const submitHandle = (event) => {
    event.preventDefault();

    if (postcode === "" || addressFromHook === "") {
      setError(true);
      setIsOpened(true);
      return;
    }

    setError(false);
    setIsOpened(false);
    setAddr(`${postcode} ${addressFromHook}`); // 주소 설정
  };

  return (
    <form id="signup-form" onSubmit={submitHandle}>
      {SIGN_UP.map((signup) => (
        <div className="signup-input-wrap" key={signup.key}>
          <label className="signup-input-label">{signup.label}</label>
          {signup.label === "주소" ? (
            <PostCodeAddress />
          ) : (
            <input
              className="signup-input"
              type={signup.type}
              placeholder={signup.placeholder}
              required
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default AdminCampAddress;
