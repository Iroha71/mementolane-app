import ActualCalendar from "@/components/actual/actual-calendar";
import { Actual } from "@/models/actual.model";
import { getActualsByDate } from "@/repositories/actual-repository";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function ActualIndex() {
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const viewDay = searchParams.get("date");

  useState(() => {
    const date = viewDay ? new Date(viewDay) : new Date();
    getActualsByDate(date)
      .then((actuals) => {
        setActuals(actuals);
        setError("");
      })
      .catch((err) => setError(err));
  });

  return (
    <main className="p-4">
      <h1>{viewDay}</h1>
      <ActualCalendar actuals={actuals} error={error} />
    </main>
  );
}
