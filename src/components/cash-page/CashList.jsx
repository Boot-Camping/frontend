import React, { useEffect } from "react";
import "./CashList.css";
import { filterData } from "../../utils/filterData";
import EmptyContent from "../common/EmptyContent";
import CashListItem from "./CashListItem";

const CashList = ({ filter, onTotalCashUpdate, cashData, errorMessage }) => {
  const filteredData = filterData(cashData, filter, "transactionType");

  const sortCashData = (data) => {
    return [...data].sort(
      (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
    );
  };

  const sortedData = sortCashData(filteredData);

  const updateTotalCash = (sortedData, onTotalCashUpdate) => {
    if (sortedData.length > 0) {
      const latestData = sortedData[0];
      onTotalCashUpdate(latestData.afterTransactionCash);
    } else {
      onTotalCashUpdate(0);
    }
  };

  useEffect(() => {
    updateTotalCash(sortedData, onTotalCashUpdate);
  }, [sortedData, onTotalCashUpdate]);

  return (
    <div className="cash-list-wrap">
      {cashData.length > 0 && sortedData.length > 0 ? (
        sortedData.map((data) => (
          <CashListItem data={data} key={`cash-list${data.transactionId}`} />
        ))
      ) : (
        <EmptyContent errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default CashList;
