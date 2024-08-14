import React, { useState } from "react";

const useAddress = () => {
  const [postcode, setPostcode] = useState("");

  return {
    postcode,
    setPostcode,
  };
};

export default useAddress;
