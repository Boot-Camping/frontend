export const filterData = (dataArray, statusFilter, statusKey) => {
  return dataArray.filter((data) => {
    if (statusFilter === "all") return true;
    return data[statusKey] === statusFilter;
  });
};
