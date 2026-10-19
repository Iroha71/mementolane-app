import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function EffortCalendar() {
  const getThisWeek = (): Date[] => {
    const thisSunday = new Date();
    thisSunday.setDate(thisSunday.getDate() - (thisSunday.getDay() % 7));
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(thisSunday);
      d.setDate(thisSunday.getDate() + i);
      return d;
    });

    return dates;
  };

  const getTimeCells = (): string[] => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }

    return times;
  };

  const timeCells = getTimeCells();

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            {timeCells.map((time) => (
              <TableHead key={time}>{time}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getThisWeek().map((day) => (
            <TableRow key={day.toLocaleDateString()}>
              <TableCell
                className={
                  day.getDay() === 0
                    ? "text-red-500"
                    : day.getDay() === 6
                      ? "text-blue-500"
                      : undefined
                }
              >
                {day.toLocaleDateString()}
              </TableCell>
              {timeCells.map((time) => (
                <TableCell key={time} className="size-4 min-w-4 border border-white bg-gray-300 p-0" />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
