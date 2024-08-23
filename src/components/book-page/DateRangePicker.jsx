import React from "react";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import format from "date-fns/format";
import { addDays, differenceInDays } from "date-fns";

import "../book-page/DateRangePicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useCampingDays } from "../../hooks/CampingDaysContext";

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

  const { setCampingDays } = useCampingDays();

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

  // startDate와 endDate 차이 일수 계산
  const numberOfNights = differenceInDays(range[0].endDate, range[0].startDate);

  useEffect(() => {
    setCampingDays(numberOfNights + 1);
  }, [numberOfNights, setCampingDays]);

  return (
    <div className="calendar-wrap">
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

      <input
        value={`${format(range[0].startDate, "yyyy/MM/dd")} 부터 ${format(
          range[0].endDate,
          "yyyy/MM/dd"
        )}까지`}
        readOnly
        className="inputbox"
        onClick={() => setOpen((open) => !open)}
      />

      <div className="nights-days-info">
        선택하신 캠핑일정은{""}
        <span className="nights-days-highlight-text">
          {" "}
          "{numberOfNights}박 {numberOfNights + 1}일"
        </span>
        {""} 입니다.
      </div>
    </div>
  );
};

export default DateRangePicker;
