import { InternalError } from "@/consts/error";
import { Actual } from "@/models/actual.model";
import { getActualInDayUseCase } from "@/usecases/actuals/getActualInDayUseCase";
import { useEffect, useState } from "react";

export function useGetActuals() {
  const [targetDay, setTargetDay] = useState<Date>(new Date());
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [error, setError] = useState<Record<string, string[]> | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchActuals = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      setActuals(await getActualInDayUseCase(targetDay));
    } catch (err) {
      if (err instanceof InternalError) {
        setError(err.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 表示する日が変わるたびに、その日の実績を取り直す
  useEffect(() => {
    fetchActuals();
  }, [targetDay]);

  /** 表示する日を diff 日だけ前後に動かす */
  const moveTargetDay = (diff: number) => {
    setTargetDay((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + diff);
      return next;
    });
  };

  const goToPrevDay = () => moveTargetDay(-1);
  const goToNextDay = () => moveTargetDay(1);

  return {
    actuals,
    isLoading,
    error,
    fetchActuals,
    targetDay,
    goToPrevDay,
    goToNextDay,
  };
}
