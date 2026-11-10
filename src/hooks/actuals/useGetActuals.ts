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

  useEffect(() => {
    fetchActuals();
  }, []);

  return { actuals, isLoading, error, fetchActuals, targetDay };
}
