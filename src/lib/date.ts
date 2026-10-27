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
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

const localDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
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

/**
 * "YYYY-MM-DD" 形式の文字列をローカル時刻の 0:00 として Date に変換する
 */
export function parseDateParam(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * 日数を加算した新しい Date を返す（元の Date は変更しない）
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
