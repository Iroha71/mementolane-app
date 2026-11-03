import { Actual } from "@/schemas/actual.schema";
import { getActualInDayUseCase } from "@/usecases/actuals/getActualInDay";
import { useEffect, useState } from "react";

export function useGetActuals() {
  const [targetDay] = useState<Date>(new Date());
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchActuals = async () => {
    try {
      setIsLoading(true);
      setError("");
      setActuals(await getActualInDayUseCase(targetDay));
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActuals();
  }, []);

  return { actuals, isLoading, error, fetchActuals, targetDay };
}
