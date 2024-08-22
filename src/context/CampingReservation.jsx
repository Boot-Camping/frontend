import React, { useState } from "react";

import DateRangePicker from "./DateRangePicker";
import PaymentAmount from "./PaymentAmount";

const CampingReservation = () => {
  const [campingDays, setCampingDays] = useState(1);
  const ChangeCampingDaysHandle = (days) => {
    setCampingDays(days);
  };

  return (
    <div>
      <DateRangePicker onCampingDaysChange={ChangeCampingDaysHandle} />
      <PaymentAmount campingDays={campingDays} />
    </div>
  );
};

export default CampingReservation;
