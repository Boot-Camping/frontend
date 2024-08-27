export const shortPeriodHyphen = (data) => {
  const startDate = data.startDate;
  const startYear = startDate.slice(2, 4);
  const startMonth = startDate.slice(5, 7);
  const startDay = startDate.slice(8, 10);
  const start = `${startYear}-${startMonth}-${startDay}`;

  const endDate = data.endDate;
  const endYear = endDate.slice(2, 4);
  const endMonth = endDate.slice(5, 7);
  const endDay = endDate.slice(8, 10);
  const end = `${endYear}-${endMonth}-${endDay}`;

  return `${start} ~ ${end}`;
};
