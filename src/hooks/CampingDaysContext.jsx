import { addDays } from "date-fns";
import React, { createContext, useContext, useState } from "react";

const CampingDaysContext = createContext();

export const CampingDaysProvider = ({ children }) => {
  const [campingDays, setCampingDays] = useState(1);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 7));

  return (
    <CampingDaysContext.Provider
      value={{
        campingDays,
        setCampingDays,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
      }}
    >
      {children}
    </CampingDaysContext.Provider>
  );
};

export const useCampingDays = () => {
  return useContext(CampingDaysContext);
};
