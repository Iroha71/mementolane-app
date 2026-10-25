import { Actual } from "@/models/actual.model";

interface ActualCalendarProps {
  actuals: Actual[];
}

const getTimes = (): string[] => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push(`${i}:00`);
    times.push(`${i}:30`);
  }

  return times;
};

export default function ActualCalendar({ actuals }: ActualCalendarProps) {
  const times = getTimes();
  const findActualInSlot = (slotNumber: number) => {
    const result = actuals.find((actual) => actual.slot === slotNumber);
    if (result !== undefined) {
      return <td key={slotNumber}>{result.task_title}</td>;
    } else {
      return <td key={slotNumber}></td>;
    }
  };
  return (
    <table>
      <tbody>
        <tr>
          {times.map((time) => (
            <th key={time}>{time}</th>
          ))}
        </tr>
        <tr>{times.map((time, index) => findActualInSlot(index))}</tr>
      </tbody>
    </table>
  );
}
