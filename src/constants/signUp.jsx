import check from "/src/assets/svg/check.svg";

/*****************************
 * 	폼 상수데이터
 */
export const signUp = [
  {
    key: "loginId",
    label: "아이디",
    type: "text",
    placeholder: "사용하고 싶은 아이디를 입력해주세요",
  },
  {
    key: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "알파벳 대문자 및 특수문자를 포함한 8자 이상의 비밀번호",
  },
  {
    key: "userName",
    label: "이름",
    type: "text",
    placeholder: "이름을 입력해주세요",
  },
  {
    key: "userTel",
    label: "전화번호",
    type: "text",
    placeholder: "전화번호를 입력해주세요",
  },
  {
    key: "email",
    label: "이메일",
    type: "text",
    placeholder: "이메일 주소를 입력해주세요",
  },
  {
    key: "addr",
    label: "주소",
    type: "text",
    placeholder: "상세주소를 입력해주세요",
  },
];

/*****************************
 * 	약관 상수데이터
 */
export const signUpTerms = [
  {
    key: "terms1",
    content: "(필수) 서비스 이용약관",
  },
  {
    key: "terms2",
    content: "(필수) 개인정보 수집 및 이용 동의",
  },
  {
    key: "terms3",
    content: "(필수) 만 14세 이상입니다",
  },
];

export const signUpImg = {
  check,
};

/*****************************
 * 	에러 모달 상수데이터
 */
export const signUpError = {
  post: "우편번호와 주소는 필수 입력사항입니다",
  terms: "필수 약관에 동의해주세요",
};
