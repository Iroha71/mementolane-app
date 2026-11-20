const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function formatWeekDay(date: string | Date): string {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return String(date);

  const mm = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const dd = String(parsedDate.getDate()).padStart(2, "0");
  return `${mm}/${dd} (${WEEKDAYS[parsedDate.getDay()]})`;
}

/** 実績スロット1つあたりの分数 */
const SLOT_MINUTES = 30;

/** 1人日あたりの時間 */
const HOURS_PER_PERSON_DAY = 8;

/** 実績スロットの件数を人日に変換する */
export function slotCountToPersonDays(slotCount: number): number {
  return (slotCount * SLOT_MINUTES) / 60 / HOURS_PER_PERSON_DAY;
}

/** ローカル時刻でその日の 0:00 を返す */
export function startOfLocalDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** 1日あたりの実績スロット数 */
const SLOTS_PER_DAY = (24 * 60) / SLOT_MINUTES;

/** ローカル日付の 0:00 から minutes 分後の record_at（UTCのISO文字列）を作る */
function toRecordAt(day: Date, minutes: number): string {
  const d = startOfLocalDay(day);
  d.setMinutes(minutes);
  return d.toISOString();
}

/** ローカル日付の 0:00 から 30 分刻みで、その日の record_at（UTCのISO文字列）を並べる */
export function getRecordAtsInDay(day: Date): string[] {
  const recordAts: string[] = [];
  for (let i = 0; i < SLOTS_PER_DAY; i++) {
    recordAts.push(toRecordAt(day, i * SLOT_MINUTES));
  }
  return recordAts;
}

/** record_at（UTCのISO文字列）を、ローカル時刻の H:mm 形式で表示する */
export function formatRecordAtLocal(recordAt: string): string {
  const d = new Date(recordAt);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}
