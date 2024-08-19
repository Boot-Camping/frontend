/*****************************
 * 	이미지 불러오기
 */
import prev from "/src/assets/svg/arrowNext.svg";
import write from "/src/assets/svg/pencilSquare.svg";
import cancel from "/src/assets/svg/xMark.svg";

export const paidIcon = {
  prev,
  write,
  cancel,
};

/*****************************
 * 	예약/이용 완료 데이터
 */
export const paidData = [
  {
    bookStatus: "예약 완료",
    startDate: "24-09-20",
    endDate: "24-09-21",
    campName: "캠프그라운드 화온",
    totalPrice: 80000,
    bookNum: 6,
    bookRequest: "5시부터 바베큐 이용하고 싶어요",
  },
  {
    bookStatus: "이용 완료",
    startDate: "24-08-10",
    endDate: "24-08-13",
    campName: "파이브이모션",
    totalPrice: 100000,
    bookNum: 3,
    bookRequest: "5시부터 바베큐 이용하고 싶어요",
  },
];
