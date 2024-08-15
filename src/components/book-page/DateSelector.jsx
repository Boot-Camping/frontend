import React from "react";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateSelector = () => {
  const [calendar, setCalendar] = useState("");
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    setCalendar(format(new Date(), "yyyy/MM/dd"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = () => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const selectHandle = (date) => {
    setCalendar(format(date, "yyyy/MM/dd"));
  };

  return (
    <div className="calendar-wrap">
      <input
        value={calendar}
        readOnly
        className="inputbox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <Calendar
            date={new Date()}
            onChange={selectHandle}
            className="calendar-element"
          />
        )}
      </div>
    </div>
  );
};

export default DateSelector;
