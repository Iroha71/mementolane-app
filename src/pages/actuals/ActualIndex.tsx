import { useEffect, useState } from "react";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDateWithWeekday, formatISODate } from "@/lib/date";
import { ActualOutput } from "@/models/actual.model";
import { getActualsInWeek } from "@/repositories/actual-repository";

const DAYS_PER_WEEK = 7;
const MINUTES_PER_SLOT = 30;
// 24時間を30分ごとに区切った枠の数
const SLOTS_PER_DAY = 48;

/**
 * 枠番号を開始時刻の "HH:MM" 形式に変換する（例: 3 → "01:30"）
 */
function slotToTimeLabel(slot: number): string {
  const totalMinutes = slot * MINUTES_PER_SLOT;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

/**
 * 基準日を含む週の日曜日から土曜日までの日付を返す
 */
function getWeekDays(baseDay: Date): Date[] {
  const sunday = new Date(baseDay);
  sunday.setDate(baseDay.getDate() - baseDay.getDay());

  const days: Date[] = [];
  for (let i = 0; i < DAYS_PER_WEEK; i++) {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    days.push(day);
  }
  return days;
}

/**
 * 日付と枠番号から、実績を引き当てるためのキーを作る
 */
function toCellKey(date: string, slot: number): string {
  return `${date}_${slot}`;
}

export default function ActualIndex() {
  const [baseDay] = useState(() => new Date());
  const [actuals, setActuals] = useState<ActualOutput[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getActualsInWeek(baseDay)
      .then((actuals) => setActuals(actuals))
      .catch((e: unknown) => {
        console.error(e);
        setError(
          (e instanceof Error ? e.message : String(e)) || "不明なエラー",
        );
      });
  }, [baseDay]);

  const weekDays = getWeekDays(baseDay);

  const slots: number[] = [];
  for (let slot = 0; slot < SLOTS_PER_DAY; slot++) {
    slots.push(slot);
  }

  // セルごとに実績を探さなくて済むよう、日付と枠番号をキーにタスクIDを引けるようにする
  const taskIdByCell = new Map<string, number>();
  for (const actual of actuals) {
    taskIdByCell.set(toCellKey(actual.date, actual.slot), actual.task_id);
  }

  return (
    <main className="flex h-screen flex-col gap-4 p-4">
      {error ? (
        <Alert className="mx-auto w-fit">
          <InfoIcon />
          <AlertTitle>データの読み込みに失敗しました</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="overflow-x-auto">
        <table className="border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 border bg-background px-2 py-1" />
              {slots.map((slot) => (
                <th
                  key={slot}
                  className="min-w-12 border px-1 py-1 font-normal"
                >
                  {slotToTimeLabel(slot)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day) => {
              const date = formatISODate(day);
              return (
                <tr key={date}>
                  <th className="sticky left-0 border bg-background px-2 py-1 whitespace-nowrap">
                    {formatDateWithWeekday(date)}
                  </th>
                  {slots.map((slot) => {
                    const taskId = taskIdByCell.get(toCellKey(date, slot));
                    return (
                      <td
                        key={slot}
                        className={`h-8 border ${taskId !== undefined ? "bg-primary" : ""}`}
                        title={
                          taskId !== undefined
                            ? `タスクID: ${taskId}`
                            : undefined
                        }
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
