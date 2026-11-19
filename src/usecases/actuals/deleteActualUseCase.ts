import { InternalError } from "@/consts/error";
import { actualInputModel } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";

export async function deleteActualUseCase(
  record_at: string,
  repo = actualRepository,
): Promise<void> {
  const parsed = actualInputModel.shape.record_at.safeParse(record_at);
  if (!parsed.success) {
    throw new InternalError({
      page: ["対象実績が見つかりません。ページを更新して最新にしてください。"],
    });
  }

  try {
    const targetActual = repo.find(parsed.data);
    if (targetActual === null)
      throw new InternalError({
        page: [
          "対象実績が見つかりません。ページを更新して最新にしてください。",
        ],
      });
    await repo.delete(parsed.data);
  } catch (err) {
    console.error(err);
    throw new InternalError({
      page: ["実績の削除に失敗しました。再度お試しください。"],
    });
  }
}
