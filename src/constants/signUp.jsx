/*****************************
 * 	폼 상수데이터
 */
export const signUp = [
  {
    key: "loginId",
    label: "아이디",
    type: "text",
    placeholder: "사용하고 싶은 아이디를 입력해주세요",
    autocomplete: "username",
  },
  {
    key: "password",
    label: "비밀번호",
    type: "text",
    placeholder: "숫자, 특수문자를 포함한 8자 이상의 비밀번호",
    autocomplete: "new-password",
  },
  {
    key: "passwordChk",
    label: "비밀번호 확인",
    type: "text",
    placeholder: "비밀번호를 다시 한번 입력해주세요",
    autocomplete: "new-password",
  },
  {
    key: "name",
    label: "이름",
    type: "text",
    placeholder: "이름을 입력해주세요",
    autocomplete: "name",
  },
  {
    key: "tel",
    label: "전화번호",
    type: "text",
    placeholder: "전화번호를 입력해주세요",
    autocomplete: "tel",
  },
  {
    key: "email",
    label: "이메일",
    type: "text",
    placeholder: "이메일 주소를 입력해주세요",
    autocomplete: "email",
  },
  {
    key: "addr",
    label: "주소",
    type: "text",
    placeholder: "상세주소를 입력해주세요",
    autocomplete: "address-line1",
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

/*****************************
 * 	에러 모달 상수데이터
 */
export const signUpError = {
  post: "우편번호와 주소는 필수 입력사항입니다",
  terms: "필수 약관에 동의해주세요",
  pw: "숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요",
  pwChk: "입력한 비밀번호가 일치하지 않습니다. 다시 확인해주세요",
  email: "유효한 이메일 주소를 입력해 주세요",
};
