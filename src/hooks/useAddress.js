import React, { useState } from "react";

const useAddress = () => {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");

  return {
    postcode,
    setPostcode,
    address,
    setAddress,
  };
};

export default useAddress;
