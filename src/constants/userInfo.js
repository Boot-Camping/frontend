import { svgCollection } from "./svgCollection";

/*****************************
 * 	유저 정보 상수데이터
 */
export const userProfile = {
  userImage: svgCollection.userImg,
  loginId: "camper123",
  userName: "홍길동",
  tel: "010-1234-5678",
  email: "camper123@gmail.com",
  addr: "(13529) 경기 성남시 분당구 판교역로 166 카카오 판교 아지트",
  cash: 100000,
};

/*****************************
 * 	변경 모달 상수데이터
 */
export const userInfoModal = {
  tel: {
    title: "전화번호 변경",
    old: "기존 전화번호",
    new: "변경 전화번호",
    icon: svgCollection.phone,
  },
  addr: {
    title: "주소 변경",
    old: "기존 주소",
    new: "변경 주소",
    icon: svgCollection.home,
  },
  password: {
    title: "비밀번호 변경",
    old: "기존 비밀번호",
    new: "새 비밀번호",
    icon: svgCollection.lock,
  },
};
