import React, { createContext, useContext, useState } from "react";

const CampingContext = createContext();

export const useCamping = () => useContext(CampingContext);

export const CampingDaysProvider = ({ children }) => {
  const [campingDays, setCampingDays] = useState(1);

  return (
    <CampingContext.Provider value={{ campingDays, setCampingDays }}>
      {children}
    </CampingContext.Provider>
  );
};
