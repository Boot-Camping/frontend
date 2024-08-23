import React, { createContext, useContext, useState } from "react";

const CampingDaysContext = createContext();

export const CampingDaysProvider = ({ children }) => {
  const [campingDays, setCampingDays] = useState(1);

  return (
    <CampingDaysContext.Provider value={{ campingDays, setCampingDays }}>
      {children}
    </CampingDaysContext.Provider>
  );
};

export const useCampingDays = () => {
  return useContext(CampingDaysContext);
};
