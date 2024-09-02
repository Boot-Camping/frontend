// import React from "react";
// import useAddress from "../../hooks/useAddress";
// import PostCodeAddress from "./PostCodeAddress";

// const SIGN_UP = [{ key: "1", label: "주소", type: "text", placeholder: "" }];

// const AdminCampAddress = ({ addr, setAddr, setError, setIsOpened }) => {
//   const { postcode = "", addr: addressFromHook = "" } = useAddress(); // 빈 문자열로 초기화

//   const submitHandle = (event) => {
//     event.preventDefault();

//     if (postcode === "" || addressFromHook === "") {
//       setError(true);
//       setIsOpened(true);
//       return;
//     }

//     setError(false);
//     setIsOpened(false);
//     setAddr(`${postcode} ${addressFromHook}`); // 주소 설정, 항상 유효한 값으로 설정
//   };

//   return (
//     <form id="signup-form" onSubmit={submitHandle}>
//       {SIGN_UP.map((signup) => (
//         <div className="signup-input-wrap" key={signup.key}>
//           <label className="signup-input-label">{signup.label}</label>
//           {signup.label === "주소" ? (
//             <PostCodeAddress />
//           ) : (
//             <input
//               className="signup-input"
//               type={signup.type}
//               placeholder={signup.placeholder}
//               required
//             />
//           )}
//         </div>
//       ))}
//     </form>
//   );
// };

// export default AdminCampAddress;

import React, { useEffect } from "react";
import useAddress from "../../hooks/useAddress";
import PostCodeAddress from "./PostCodeAddress";

const SIGN_UP = [{ key: "1", label: "주소", type: "text", placeholder: "" }];

const AdminCampAddress = ({ addr, setAddr, setError, setIsOpened }) => {
  const {
    postcode = "",
    addr: addressFromHook = "",
    detailAddress = "",
  } = useAddress(); // detailAddress 추가

  // addr이 변경될 때마다 업데이트
  useEffect(() => {
    setAddr(`${postcode} ${addressFromHook} ${detailAddress}`.trim());
  }, [postcode, addressFromHook, detailAddress, setAddr]);

  const submitHandle = (event) => {
    event.preventDefault();

    if (postcode === "" || addressFromHook === "" || detailAddress === "") {
      setError(true);
      setIsOpened(true);
      return;
    }

    setError(false);
    setIsOpened(false);
    setAddr(`${postcode} ${addressFromHook} ${detailAddress}`.trim()); // 최종 addr 설정
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
