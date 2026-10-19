import EffortCalendar from "@/components/effort/EffortCalendar";
import { getEffortsInWeek } from "@/repositories/effort-repository";
import { useEffect } from "react";

export default function EffortIndex() {
  useEffect(() => {
    getEffortsInWeek(new Date())
      .then((efforts) => {
        console.log(efforts);
      })
      .catch((err: Error) => console.log(err.message));
  }, []);
  return <EffortCalendar></EffortCalendar>;
}
