export const filterType = {
  paid: [
    {
      status: "BOOKING",
      type: "예약 완료",
      class: "book-filter",
    },
    {
      status: "DECIDE",
      type: "이용 완료",
      class: "usage-filter",
    },
    {
      status: "CANCEL",
      type: "예약 취소",
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
    {
      status: "REFUND",
      type: "환불",
      class: "charge-filter",
    },
    {
      status: "REWARD",
      type: "적립",
      class: "charge-filter",
    },
  ],
};
