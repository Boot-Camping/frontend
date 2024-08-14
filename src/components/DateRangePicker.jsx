import React from "react";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "../css/DateRangePicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendar-wrap">
      <input
        value={`${format(range[0].startDate, "yyyy/MM/dd")} 부터 ${format(
          range[0].endDate,
          "yyyy/MM/dddd"
        )}까지`}
        readOnly
        className="inputbox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendar-element"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
