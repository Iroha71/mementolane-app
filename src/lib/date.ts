const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export const formatDate = (date: Date | null): string => {
  if (date === null) return "";
  if (Number.isNaN(date.getTime())) {
    console.log(date);
    return date.toString();
  } else {
    return date.toISOString();
  }
};

export function formatWeekDay(date: Date | null): string {
  if (date === null) return "";
  if (Number.isNaN(date.getTime())) return date.toString();

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}/${dd}（${WEEKDAYS[date.getDay()]}）`;
}

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

const localDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

export function formatLocalDate(date: Date): string {
  return localDateFormatter.format(date);
}

/**
 * ローカル時刻の "YYYY-MM-DD" 形式に変換する（URL パラメータ用）
 */
export function formatDateParam(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
