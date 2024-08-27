// import React, { useState } from "react";
// import useAddress from "../../hooks/useAddress";
// import PostCodeAddress from "../admin-camping-register-page/PostCodeAddress";

// const SIGN_UP = [{ key: "1", label: "주소", type: "text", placeholder: "" }];

// const AdminCampAddress = ({ setError, setIsOpened }) => {
//   const { postcode, address } = useAddress();

//   const submitHandle = (event) => {
//     event.preventDefault();

//     if (postcode === "" || address === "") {
//       setError(true);
//       setIsOpened(true);
//       return;
//     }

//     setError(false); // 에러가 없으면 메시지 초기화
//     setIsOpened(false);
//     console.log("제출 완료");
//   };

//   return (
//     <>
//       <form id="signup-form" onSubmit={submitHandle}>
//         {SIGN_UP.map((signup) => (
//           <div className="signup-input-wrap" key={signup.key}>
//             <label className="signup-input-label">{signup.label}</label>
//             {signup.label === "주소" ? (
//               <PostCodeAddress />
//             ) : (
//               <input
//                 className="signup-input"
//                 type={signup.type}
//                 placeholder={signup.placeholder}
//                 required
//               />
//             )}
//           </div>
//         ))}
//       </form>
//     </>
//   );
// };

// export default AdminCampAddress;

import React from "react";
import useAddress from "../../hooks/useAddress";
import PostCodeAddress from "../admin-camping-register-page/PostCodeAddress";

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
    setAddr(`${postcode} ${addressFromHook}`);
    console.log("제출 완료");
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
