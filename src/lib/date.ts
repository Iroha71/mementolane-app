const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * "YYYY/MM/DD" 形式の文字列を "MM/dd (曜日)" 形式に変換する
 */
export function formatDateWithWeekday(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}/${dd} (${WEEKDAYS[date.getDay()]})`;
}

export function formatISODatetime(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}+09:00`;
}
