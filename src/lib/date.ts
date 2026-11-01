const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export const formatDate = (date: Date | null): string => {
  if (date === null) return "";
  if (Number.isNaN(date.getTime())) {
    console.log(date);
    return date.toString();
  } else {
    // toISOString() は UTC に換算されて日付がずれるため、ローカル時刻の年月日から組み立てる
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
};

export function formatWeekDay(date: string): string {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;

  const mm = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const dd = String(parsedDate.getDate()).padStart(2, "0");
  return `${mm}/${dd}（${WEEKDAYS[parsedDate.getDay()]}）`;
}
