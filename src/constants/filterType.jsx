export const filterType = {
  paid: [
    {
      status: "BOOKING",
      type: "예약 완료",
      class: "book-filter",
    },
    {
      status: "이용 완료",
      type: "이용 완료",
      class: "usage-filter",
    },
  ],
  cash: [
    {
      status: "DEPOSIT",
      type: "충전",
      class: "charge-filter",
    },
    {
      status: "PAYMENT",
      type: "사용",
      class: "use-filter",
    },
  ],
  notice: [
    {
      type: "공지사항",
      class: "notice-filter",
    },
    {
      type: "이벤트",
      class: "event-filter",
    },
  ],
};
