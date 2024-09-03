import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays, differenceInDays } from "date-fns";
import { useCampingDays } from "../../context/campingDaysContext";

import "../book-page/DateRangePicker.css";
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

  const refOne = useRef(null);

  const { setCampingDays, setCheckIn, setCheckOut } = useCampingDays();

  // startDate와 endDate 차이 일수 계산
  const numberOfNights = differenceInDays(range[0].endDate, range[0].startDate);

  useEffect(() => {
    if (range[0].endDate) {
      setCampingDays(numberOfNights + 1);
      setCheckIn(range[0].startDate);
      setCheckOut(range[0].endDate);
    }
  }, [numberOfNights, range, setCampingDays, setCheckIn, setCheckOut]);

  return (
    <div className="calendar-wrap underline">
      <div ref={refOne}>
        <DateRange
          onChange={(item) => setRange([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={range}
          months={1}
          direction="horizontal"
          className="calendar-element"
        />
      </div>

      <input
        value={`${format(range[0].startDate, "yyyy/MM/dd")} 부터 ${format(
          range[0].endDate,
          "yyyy/MM/dd"
        )}까지`}
        readOnly
        className="inputbox"
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
