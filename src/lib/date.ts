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

/** 実績スロット1つあたりの分数 */
const SLOT_MINUTES = 30;

/** ローカル時刻でその日の 0:00 を返す */
export function startOfLocalDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** ローカル日付とスロット番号から、保存用の record_at（UTCのISO文字列）を作る */
export function slotToRecordAt(day: Date, slot: number): string {
  const d = startOfLocalDay(day);
  d.setMinutes(slot * SLOT_MINUTES);
  return d.toISOString();
}

/** 保存されている record_at（UTCのISO文字列）を、表示用のローカルスロット番号に変換する */
export function recordAtToSlot(recordAt: string): number {
  const d = new Date(recordAt);
  return d.getHours() * 2 + Math.floor(d.getMinutes() / SLOT_MINUTES);
}
