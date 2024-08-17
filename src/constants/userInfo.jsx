/*****************************
 * 	이미지 불러오기
 */
import userIcon from "../assets/svg/userImg.svg";
import photo from "../assets/svg/photo.svg";
import change from "../assets/svg/arrowChange.svg";
import prev from "../assets/svg/arrowNext.svg";
import phone from "../assets/svg/phone.svg";
import home from "../assets/svg/home.svg";
import lock from "../assets/svg/lockClosed.svg";
import xMark from "../assets/svg/xMark.svg";

export const userInfoIcon = {
  prev,
  userIcon,
  photo,
  change,
  phone,
  home,
  lock,
  xMark,
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

/*****************************
 * 	변경 모달 상수데이터
 */
export const userInfoModal = {
  userTel: {
    title: "전화번호 변경",
    old: "기존 전화번호",
    new: "변경 전화번호",
    icon: userInfoIcon.phone,
  },
  addr: {
    title: "주소 변경",
    old: "기존 주소",
    new: "변경 주소",
    icon: userInfoIcon.home,
  },
  password: {
    title: "비밀번호 변경",
    old: "기존 비밀번호",
    new: "새 비밀번호",
    icon: userInfoIcon.lock,
  },
};

export const userOldData = {
  userTel: 10011110000,
  addr: {
    address: "(13529) 경기 성남시 분당구 판교역로 166",
    detailAddress: "카카오 판교 아지트",
  },
};
