/**********************************
 * 	날짜 형식 변경 함수
 * 	0000-00-00T00:00:00
 * 	=> (당일) 0초 전 ~ 59초 전
 * 	=> (당일) 1분 전 ~ 59분 전
 * 	=> (당일) 1시간 전 ~ 23시간 전
 * 	=> (일주일전) 1일 전 ~ 6일 전
 * 	=> (일주일후) 0월 0일
 */

export const relativeDate = (dateString) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffTime = now - inputDate;
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const isToday = inputDate.toDateString() === now.toDateString();

  if (isToday) {
    if (diffSeconds < 60) {
      return `${diffSeconds}초 전`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else {
      return `${diffHours}시간 전`;
    }
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    const month = inputDate.getMonth();
    const day = inputDate.getDate();
    return `${month}월 ${day}일`;
  }
};
