import user from "../assets/svg/userImg.svg";
import setting from "../assets/svg/cog6Tooth.svg";
import calendar from "../assets/svg/calendarDays.svg";
import pencilSquare from "../assets/svg/pencilSquare.svg";
import heart from "../assets/svg/heart.svg";
import cash from "../assets/svg/banknotes.svg";
import next from "../assets/svg/arrowNext.svg";

export const myPageData = {
  loginId: "camper123",
  userImg: "",
};

export const mypageImgs = {
  user,
  setting,
  calendar,
  pencilSquare,
  heart,
  cash,
  next,
};

export const mypageBtns = [
  {
    key: "mypage-btn-paid",
    src: "calendar",
    txt: "결제 내역",
  },
  {
    key: "mypage-btn-review",
    src: "pencilSquare",
    txt: "나의 리뷰",
  },
  {
    key: "mypage-btn-save",
    src: "heart",
    txt: "찜 목록",
  },
  {
    key: "mypage-btn-cash",
    src: "cash",
    txt: "캐시 충전/사용",
  },
];
