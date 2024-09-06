import { svgCollection } from "./svgCollection";

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
