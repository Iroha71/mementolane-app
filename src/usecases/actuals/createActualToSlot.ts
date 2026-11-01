import { insertActual } from "@/repositories/actual-repository";
import { actualInput, ActualInput } from "@/schemas/actual.schema";
import z from "zod";

type ActualValidateError = z.core.$ZodFlattenedError<
  z.output<ActualInput>
>["fieldErrors"];

export async function createActualToSlot(actual: ActualInput): Promise<{
  error: ActualValidateError | null;
}> {
  const parsedInput = actualInput.safeParse(actual);
  if (parsedInput.success === false) {
    const error = z.flattenError(parsedInput.error).fieldErrors;
    return {
      error: error,
    };
  }

  try {
    await insertActual(
      parsedInput.data.record_at,
      parsedInput.data.slot,
      parsedInput.data.task_id,
    );

    return {
      error: null,
    };
  } catch (err) {
    console.error(err);
    throw new Error("実績の登録に失敗しました。再度登録してください。");
  }
}
