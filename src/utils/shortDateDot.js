/**********************************
 * 	날짜 형식 변경 함수
 * 	0000-00-00T00:00:00
 * 	=> 0000.00.00
 */
export const shortDateDot = (data) => {
  const date = data.createAt.split("T")[0];
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${year}.${month}.${day}`;
};
