/*****************************
 * 	이미지 불러오기
 */
import userIcon from "../assets/svg/userImg.svg";
import photo from "../assets/svg/photo.svg";
import change from "../assets/svg/arrowChange.svg";
import prev from "../assets/svg/arrowNext.svg";

export const userInfoIcon = {
  prev,
  userIcon,
  photo,
  change,
};

/*****************************
 * 	유저 정보 상수데이터
 */
export const userProfile = {
  userImage: userInfoIcon.userIcon,
  loginId: "camper123",
  userName: "홍길동",
  userTel: 10011110000,
  email: "camper123@gmail.com",
  addr: {
    address: "(13529) 경기 성남시 분당구 판교역로 166",
    detailAddress: "카카오 판교 아지트",
  },
  cash: 100000,
};
