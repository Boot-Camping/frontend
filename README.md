## 🙌 안녕하세요, boot-camping 프론트엔드 팀 입니다!

## 🗓️ 프로젝트 기간: 2024년 8월 12일 ~ 9월 6일

## ❓ boot-camping이 뭔가요??

- 국내 지역별 캠핑지를 쉽고 편리하게 검색하고 예약할 수 있는 플랫폼 
- 주요 기능
  1. 지역별 캠핑지 검색 및 상세 정보 제공
  2. 원하는 날짜에 맞춰 캠핑지 예약 및 결제
  3. 캠핑장 근처 편의점 조회
  4. 간단한 캐시 충전 및 결제 시스템

## 🙋‍♀️ 좀 더 구체적으로 가르쳐주세요!

1. boot-camping은 모바일 퍼스트 프로젝트이며, PC 및 모바일 브라우저에서 모두 UI를 지원합니다. 
2. boot-camping은 주소 검색 API 및 카카오 지도 API를 활용하였으며, 찜하기, 리뷰작성 및 채팅기능 등 다양한 시도를 한 프로젝트 입니다.

## 🏁 boot-camping 로고
<img src="https://github.com/user-attachments/assets/7a51e066-f302-42b7-b8e3-e52ea500c893" alt="searchPage1" width= "300" height="75">

## 🏠 배포주소 및 Github 주소

- **배포 주소**: https://boot-camping.netlify.app

## 🛠️ 기술스택

- Environment: VS Code
- Config: npm
- Development: React, JavaScript, Axios
- Communication: Notion, Discord

## 🧑‍💻 팀원소개 및 담당기능
### 이연주(CTO)
- **회원기능**
  - 회원가입
  - 회원정보 수정
  - 주소 검색
  - 로그인/ 로그아웃/ 회원탈퇴
  - 캐시 충전 및 사용내역 조회
- **마이페이지**
  - 유저정보 조회/ 수정
  - 예약 내역 조회
  - 찜목록 조회 및 삭제
  - 전체 & 상세 공지사항 조회
  - 캠핑지 예약조회 및 예약취소
- **채팅기능**
<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/77434b76-36d1-468d-b0cd-5fe2c802673e" alt="myPage" width="150">
  <img src="https://github.com/user-attachments/assets/537fec7b-14e2-4df6-8c2b-09f5e2c13c77" alt="userInfo" width="150">
  <img src="https://github.com/user-attachments/assets/a55abc1f-413c-4118-b300-5dc95b423291" alt="paidList" width="150">
  <img src="https://github.com/user-attachments/assets/e2151e0c-c276-4bfe-92c1-215211c451f6" alt="saveList" width="150">
</div>

<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/72180924-a007-4c67-ab70-e6033ef83080" alt="cashPage" width="150">
  <img src="https://github.com/user-attachments/assets/db29a4ce-4ad2-4d34-8cc0-ec33dc2258eb" alt="noticeList" width="150">
  <img src="https://github.com/user-attachments/assets/316bc3ef-cc90-4925-bd2c-0773439d77ef" alt="chatPage" width="150">
</div>


### 이성민
- **메인 페이지**
  - 전체 캠핑지 조회
  - 실시간 리뷰 조회
  - 캠핑지 정렬필터
  - 캠핑지 검색 및 최근 검색기록 조회
  - 캠핑지 '찜하기'
  - 유저 리뷰 조회
- **카테고리 페이지**
  - 카테고리별 캠핑지 조회
<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/42174b77-3e22-4773-86b4-e70c6c8573f9" alt="mainPage-1" width="150">
  <img src="https://github.com/user-attachments/assets/781c0801-fb98-478e-8781-feb68f6b1964" alt="mainPage-2" width="150">
  <img src="https://github.com/user-attachments/assets/13352796-664e-460a-a706-649f019e96fa" alt="categoryPage" width="150">
   <img src="https://github.com/user-attachments/assets/d19813fd-ac71-487d-8e59-6b66143243a7" alt="searchPage" width="150">
</div>


### 이현빈
- **관리자페이지**
  - 캠핑지 등록/ 수정/ 삭제
  - 공지사항 등록/ 수정/ 삭제
  - 전체 & 상세 공지사항 조회
  - 사이트 통계
  - 전체 회원 조회
  - 전체 리뷰 조회
  - 리뷰 삭제
<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/3fec7698-aecf-4bc4-9d29-1a303e407c73" alt="adminPage" width="150">
  <img src="https://github.com/user-attachments/assets/2e9b1f9f-ff09-4a64-9bc6-d8abd1eb1b24" alt="campRegister" width="150">
  <img src="https://github.com/user-attachments/assets/ccbad79a-0bab-4d0a-82af-01d92357cbda" alt="adminNotice" width="150">
</div>


### 이세원
- **캠핑지 상세 페이지**
  - 캠핑지 상세정보 조회
  - 캠핑지 '찜하기'
  - 캠핑장 근처 편의점 탐색 지도
  - 캠핑지별 리뷰 조회 및 댓글 작성
- **캠핑지 예약 페이지**
  - 캠핑일정 선택 달력
- **캠핑지 결제 페이지**
  - 예약인원 입력 및 결제금 연산
- **마이리뷰 페이지**
  - 나의 리뷰 조회/ 수정/ 삭제
- **헤더 & 푸터**
<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/7f6f6cba-c8a7-4242-bd36-f1397d38b1d8" alt="detailPage-1" width="150">
  <img src="https://github.com/user-attachments/assets/da973cfe-4f29-4866-ae0f-6a83482a5252" alt="detailPage-2" width="150">
  <img src="https://github.com/user-attachments/assets/af39fbe4-9ff2-4d7a-bb59-5ecfb92be70d" alt="bookPage" width="150">
  <img src="https://github.com/user-attachments/assets/eb7621e6-3695-47e2-b255-2ad79682834f" alt="paymentPage" width="150">
  <img src="https://github.com/user-attachments/assets/f793b962-1a20-448d-bb97-d6b0ca142ad8" alt="myReview" width="150">
</div>
