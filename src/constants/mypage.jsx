/*****************************
 * 	이미지 불러오기
 */
import user from "/src/assets/svg/userImg.svg";
import setting from "/src/assets/svg/cog6Tooth.svg";
import calendar from "/src/assets/svg/calendarDays.svg";
import pencilSquare from "/src/assets/svg/pencilSquare.svg";
import heart from "/src/assets/svg/heart.svg";
import cash from "/src/assets/svg/banknotes.svg";
import next from "/src/assets/svg/arrowNext.svg";

/*****************************
 * 	유저 정보 상수데이터
 */
export const myPageData = {
  loginId: "camper123",
  userImg: "",
};

/*****************************
 * 	이미지 데이터
 */
export const mypageImgs = {
  user,
  setting,
  calendar,
  pencilSquare,
  heart,
  cash,
  next,
};

/*****************************
 * 	버튼 데이터
 */
export const mypageBtns = [
  {
    key: "mypage-btn-paid",
    link: "/paid",
    src: "calendar",
    txt: "결제 내역",
  },
  {
    key: "mypage-btn-review",
    link: "/mypage/review",
    src: "pencilSquare",
    txt: "나의 리뷰",
  },
  {
    key: "mypage-btn-save",
    link: "/save",
    src: "heart",
    txt: "찜 목록",
  },
  {
    key: "mypage-btn-cash",
    link: "/cash",
    src: "cash",
    txt: "캐시 충전/사용",
  },
];
